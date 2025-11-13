// Exemplo mais "fullstack"/integrado usando o EventBus.
// Simula serviços de checkout, estoque e notificação reagindo a eventos.

import { InMemoryEventBus, DomainEvent } from "./concepts";

type CartCheckedOut = DomainEvent<{
  cartId: string;
  userId: string;
  total: number;
}> & { type: "CART_CHECKED_OUT" };

type InventoryUpdated = DomainEvent<{
  cartId: string;
}> & { type: "INVENTORY_UPDATED" };

type UserNotified = DomainEvent<{
  userId: string;
}> & { type: "USER_NOTIFIED" };

export async function demoIntegrationExample(): Promise<void> {
  const bus = new InMemoryEventBus();

  // Serviço de estoque
  bus.subscribe("CART_CHECKED_OUT", async (event: CartCheckedOut) => {
    console.log("[InventoryService] Atualizando estoque para carrinho", event.payload.cartId);
    const inventoryEvent: InventoryUpdated = {
      type: "INVENTORY_UPDATED",
      timestamp: new Date(),
      payload: { cartId: event.payload.cartId },
    };
    await bus.publish(inventoryEvent);
  });

  // Serviço de notificação
  bus.subscribe("INVENTORY_UPDATED", async (event: InventoryUpdated) => {
    console.log("[NotificationService] Estoque atualizado. Enviando notificação para o usuário...");
    const notified: UserNotified = {
      type: "USER_NOTIFIED",
      timestamp: new Date(),
      payload: { userId: "u-notify" },
    };
    await bus.publish(notified);
  });

  // Frontend ou API de checkout publica evento de carrinho finalizado
  const checkedOut: CartCheckedOut = {
    type: "CART_CHECKED_OUT",
    timestamp: new Date(),
    payload: { cartId: "cart-123", userId: "u-notify", total: 300 },
  };

  console.log("Publicando CART_CHECKED_OUT...");
  await bus.publish(checkedOut);
}
