// Conceitos básicos de Arquitetura Orientada a Eventos (EDA).
// Estes tipos e interfaces servem como base para os outros exemplos.

export type EventPayload = Record<string, unknown>;

export interface DomainEvent<TPayload extends EventPayload = EventPayload> {
  type: string;
  timestamp: Date;
  payload: TPayload;
}

export type EventHandler<TEvent extends DomainEvent = DomainEvent> = (
  event: TEvent
) => void | Promise<void>;

// Produtor de eventos: algo que publica eventos em um barramento.
export interface EventProducer {
  publish(event: DomainEvent): Promise<void>;
}

// Consumidor de eventos: algo que reage a eventos.
export interface EventConsumer {
  handle(event: DomainEvent): Promise<void>;
}

// EventBus simples em memória.
export class InMemoryEventBus implements EventProducer {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe(eventType: string, handler: EventHandler): void {
    const list = this.handlers.get(eventType) ?? [];
    list.push(handler);
    this.handlers.set(eventType, list);
  }

  async publish(event: DomainEvent): Promise<void> {
    const list = this.handlers.get(event.type) ?? [];
    for (const handler of list) {
      await handler(event);
    }
  }
}

export function demoConcepts(): void {
  console.log("Evento: registro de uma ocorrência significativa ou mudança de estado.");
  console.log("Produtor: detecta o evento e o publica em uma plataforma de mensagens.");
  console.log("Consumidor: reage ao evento executando alguma lógica.");
  console.log("Desacoplamento: produtor não conhece diretamente quem consome.");
  console.log("Plataforma de processamento: Kafka, RabbitMQ, etc., processando eventos de forma assíncrona.");
}
