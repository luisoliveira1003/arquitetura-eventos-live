// Saga: coordena uma transação distribuída através de uma série de passos,
// cada um com sua transação local e, se necessário, uma transação de compensação.

import { InMemoryEventBus, DomainEvent } from "./concepts";

type OrderCreated = DomainEvent<{
  orderId: string;
  userId: string;
  total: number;
}> & { type: "ORDER_CREATED" };

type PaymentAuthorized = DomainEvent<{
  orderId: string;
}> & { type: "PAYMENT_AUTHORIZED" };

type PaymentFailed = DomainEvent<{
  orderId: string;
}> & { type: "PAYMENT_FAILED" };

type StockReserved = DomainEvent<{
  orderId: string;
}> & { type: "STOCK_RESERVED" };

type StockReservationFailed = DomainEvent<{
  orderId: string;
}> & { type: "STOCK_RESERVATION_FAILED" };

type OrderCompleted = DomainEvent<{ orderId: string }> & { type: "ORDER_COMPLETED" };

type OrderCancelled = DomainEvent<{ orderId: string }> & { type: "ORDER_CANCELLED" };

export async function demoSaga(): Promise<void> {
  const bus = new InMemoryEventBus();

  // Serviço de pagamento
  bus.subscribe("ORDER_CREATED", async (event: OrderCreated) => {
    console.log("[PaymentService] Processando pagamento da ordem", event.payload.orderId);
    // para simplificar, vamos autorizar sempre
    const paymentAuthorized: PaymentAuthorized = {
      type: "PAYMENT_AUTHORIZED",
      timestamp: new Date(),
      payload: { orderId: event.payload.orderId },
    };
    await bus.publish(paymentAuthorized);
  });

  // Serviço de estoque
  bus.subscribe("PAYMENT_AUTHORIZED", async (event: PaymentAuthorized) => {
    console.log("[StockService] Reservando estoque para ordem", event.payload.orderId);
    const stockReserved: StockReserved = {
      type: "STOCK_RESERVED",
      timestamp: new Date(),
      payload: { orderId: event.payload.orderId },
    };
    await bus.publish(stockReserved);
  });

  // Orquestrador de Saga (poderia ser coreografia também, aqui está centralizado)
  bus.subscribe("STOCK_RESERVED", async (event: StockReserved) => {
    const completed: OrderCompleted = {
      type: "ORDER_COMPLETED",
      timestamp: new Date(),
      payload: { orderId: event.payload.orderId },
    };
    console.log("[OrderSaga] Ordem concluída com sucesso:", event.payload.orderId);
    await bus.publish(completed);
  });

  // Tratamento de falhas (exemplo simplificado)
  const cancelOnFailure = async (event: PaymentFailed | StockReservationFailed) => {
    const cancelled: OrderCancelled = {
      type: "ORDER_CANCELLED",
      timestamp: new Date(),
      payload: { orderId: event.payload.orderId },
    };
    console.log("[OrderSaga] Cancelando ordem por falha em etapa:", event.type);
    await bus.publish(cancelled);
  };

  bus.subscribe("PAYMENT_FAILED", cancelOnFailure);
  bus.subscribe("STOCK_RESERVATION_FAILED", cancelOnFailure);

  const orderCreated: OrderCreated = {
    type: "ORDER_CREATED",
    timestamp: new Date(),
    payload: { orderId: "order-1", userId: "u1", total: 150 },
  };

  console.log("Publicando ORDER_CREATED...");
  await bus.publish(orderCreated);
}
