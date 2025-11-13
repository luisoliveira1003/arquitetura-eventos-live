// Event Sourcing básico.
// Em vez de salvar apenas o estado atual, salvamos todos os eventos
// e reconstruímos o estado a partir deles.

import { DomainEvent } from "./concepts";

export type AccountOpenedEvent = DomainEvent<{
  accountId: string;
  owner: string;
}> & { type: "ACCOUNT_OPENED" };

export type MoneyDepositedEvent = DomainEvent<{
  accountId: string;
  amount: number;
}> & { type: "MONEY_DEPOSITED" };

export type MoneyWithdrawnEvent = DomainEvent<{
  accountId: string;
  amount: number;
}> & { type: "MONEY_WITHDRAWN" };

export type AccountEvent =
  | AccountOpenedEvent
  | MoneyDepositedEvent
  | MoneyWithdrawnEvent;

export interface AccountState {
  accountId: string;
  owner: string;
  balance: number;
}

export class InMemoryEventStore {
  private events: AccountEvent[] = [];

  append(event: AccountEvent): void {
    this.events.push(event);
  }

  allEvents(): AccountEvent[] {
    return [...this.events];
  }

  eventsByAccount(accountId: string): AccountEvent[] {
    return this.events.filter((e) => e.payload.accountId === accountId);
  }
}

export function rebuildAccountState(events: AccountEvent[]): AccountState | null {
  if (events.length === 0) return null;

  let state: AccountState | null = null;

  for (const event of events) {
    switch (event.type) {
      case "ACCOUNT_OPENED":
        state = {
          accountId: event.payload.accountId,
          owner: event.payload.owner,
          balance: 0,
        };
        break;
      case "MONEY_DEPOSITED":
        if (!state) throw new Error("Conta não aberta");
        state.balance += event.payload.amount;
        break;
      case "MONEY_WITHDRAWN":
        if (!state) throw new Error("Conta não aberta");
        state.balance -= event.payload.amount;
        break;
    }
  }

  return state;
}

export async function demoEventSourcing(): Promise<void> {
  const store = new InMemoryEventStore();

  const opened: AccountOpenedEvent = {
    type: "ACCOUNT_OPENED",
    timestamp: new Date(),
    payload: { accountId: "acc1", owner: "Luis" },
  };

  const deposit: MoneyDepositedEvent = {
    type: "MONEY_DEPOSITED",
    timestamp: new Date(),
    payload: { accountId: "acc1", amount: 100 },
  };

  const withdraw: MoneyWithdrawnEvent = {
    type: "MONEY_WITHDRAWN",
    timestamp: new Date(),
    payload: { accountId: "acc1", amount: 40 },
  };

  store.append(opened);
  store.append(deposit);
  store.append(withdraw);

  const events = store.eventsByAccount("acc1");
  const state = rebuildAccountState(events);

  console.log("Eventos para conta acc1:", events);
  console.log("Estado reconstruído:", state);
}
