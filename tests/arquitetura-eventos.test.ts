import { describe, it, expect } from "vitest";
import { InMemoryEventStore, rebuildAccountState } from "../src/event-sourcing";

describe("Arquitetura Orientada a Eventos - Event Sourcing básico", () => {
  it("reconstrói o estado da conta a partir dos eventos", () => {
    const store = new InMemoryEventStore();

    store.append({
      type: "ACCOUNT_OPENED",
      timestamp: new Date(),
      payload: { accountId: "acc-test", owner: "Teste" },
    } as any);

    store.append({
      type: "MONEY_DEPOSITED",
      timestamp: new Date(),
      payload: { accountId: "acc-test", amount: 100 },
    } as any);

    store.append({
      type: "MONEY_WITHDRAWN",
      timestamp: new Date(),
      payload: { accountId: "acc-test", amount: 40 },
    } as any);

    const events = store.eventsByAccount("acc-test");
    const state = rebuildAccountState(events)!;

    expect(state.accountId).toBe("acc-test");
    expect(state.owner).toBe("Teste");
    expect(state.balance).toBe(60);
  });
});
