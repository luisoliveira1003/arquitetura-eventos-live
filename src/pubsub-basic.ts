// Exemplo simples de Pub/Sub usando o InMemoryEventBus.
// Focado em mostrar o desacoplamento entre produtor e consumidores.

import { InMemoryEventBus, DomainEvent } from "./concepts";

export async function demoPubSub(): Promise<void> {
  const bus = new InMemoryEventBus();

  // Consumidor 1: envia e-mail
  bus.subscribe("USER_REGISTERED", async (event: DomainEvent) => {
    console.log(`[EmailService] Enviando e-mail de boas-vindas para ${event.payload.email}`);
  });

  // Consumidor 2: registra em analytics
  bus.subscribe("USER_REGISTERED", async (event: DomainEvent) => {
    console.log("[AnalyticsService] Registrando novo usuário:", event.payload);
  });

  const event: DomainEvent = {
    type: "USER_REGISTERED",
    timestamp: new Date(),
    payload: {
      userId: "u1",
      email: "user@example.com",
    },
  };

  console.log("Publicando evento USER_REGISTERED...");
  await bus.publish(event);
}
