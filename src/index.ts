// Ponto de entrada da live "Arquitetura Orientada a Eventos".
// Aqui chamamos as funções de demonstração definidas em arquivos separados.

import { demoConcepts } from "./concepts";
import { demoPubSub } from "./pubsub-basic";
import { demoEventSourcing } from "./event-sourcing";
import { demoCqrs } from "./cqrs-simplified";
import { demoSaga } from "./saga";
import { demoIntegrationExample } from "./integration-example";

async function main() {
  console.log("=== Conceitos básicos de EDA ===");
  demoConcepts();

  console.log("\n=== Pub/Sub em memória ===");
  await demoPubSub();

  console.log("\n=== Event Sourcing básico ===");
  await demoEventSourcing();

  console.log("\n=== CQRS simplificado (commands x queries) ===");
  await demoCqrs();

  console.log("\n=== Saga (processo de pedido com compensações) ===");
  await demoSaga();

  console.log("\n=== Exemplo de integração entre serviços ===");
  await demoIntegrationExample();
}

main().catch((err) => {
  console.error("[main] Erro inesperado:", err);
});
