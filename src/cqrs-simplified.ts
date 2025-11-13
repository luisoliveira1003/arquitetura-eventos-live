// CQRS simplificado: separar commands de queries.
// Commands alteram o estado e geram eventos; queries leem projeções.

import { InMemoryEventStore, AccountEvent, rebuildAccountState } from "./event-sourcing";

// Command handlers
export class AccountCommandService {
  constructor(private readonly store: InMemoryEventStore) {}

  openAccount(accountId: string, owner: string): void {
    const event: AccountEvent = {
      type: "ACCOUNT_OPENED",
      timestamp: new Date(),
      payload: { accountId, owner },
    } as any;
    this.store.append(event);
  }

  deposit(accountId: string, amount: number): void {
    const event: AccountEvent = {
      type: "MONEY_DEPOSITED",
      timestamp: new Date(),
      payload: { accountId, amount },
    } as any;
    this.store.append(event);
  }

  withdraw(accountId: string, amount: number): void {
    const event: AccountEvent = {
      type: "MONEY_WITHDRAWN",
      timestamp: new Date(),
      payload: { accountId, amount },
    } as any;
    this.store.append(event);
  }
}

// Query handler (lê projeções)
export class AccountQueryService {
  constructor(private readonly store: InMemoryEventStore) {}

  getAccountState(accountId: string) {
    const events = this.store.eventsByAccount(accountId);
    return rebuildAccountState(events);
  }
}

export async function demoCqrs(): Promise<void> {
  const store = new InMemoryEventStore();
  const commands = new AccountCommandService(store);
  const queries = new AccountQueryService(store);

  commands.openAccount("acc2", "Maria");
  commands.deposit("acc2", 200);
  commands.withdraw("acc2", 50);

  const state = queries.getAccountState("acc2");
  console.log("Estado da conta acc2 (via CQRS):", state);
}
