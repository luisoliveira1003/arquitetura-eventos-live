# Arquitetura Orientada a Eventos (EDA) com TypeScript

Este repositório contém exemplos e implementações didáticas usados na live "Arquitetura Orientada a Eventos – Desvendando o Poder da Reatividade no Desenvolvimento Fullstack".

## Conteúdo principal

- Conceitos: eventos, produtor, consumidor e desacoplamento
- Modelos: Pub/Sub e fluxo de eventos
- Padrões: Pub/Sub, Event Sourcing, CQRS, Sagas
- Exemplos práticos em TypeScript para estudar e executar localmente

## Requisitos

- Node.js 18 ou superior
- npm (ou `yarn` / `pnpm`)

## Instalação

No terminal (PowerShell ou outro):

```powershell
# instalar dependências
npm install
```

## Como rodar os exemplos

```powershell
# executar em modo de desenvolvimento (watch / demos)
npm run dev

# rodar testes
npm test

# compilar para JavaScript
npm run build

# executar versão compilada
npm start
```

## Estrutura do projeto

- `src/` — fontes TypeScript com exemplos e utilitários
  - `src/concepts.ts` — tipos e conceitos básicos (Evento, Produtor, Consumidor, EventBus)
  - `src/pubsub-basic.ts` — exemplo simples de Pub/Sub em memória
  - `src/event-sourcing.ts` — Event Store em memória e reconstrução de estado
  - `src/cqrs-simplified.ts` — exemplo simplificado de CQRS usando eventos
  - `src/saga.ts` — exemplo de Saga (processos com compensação)
  - `src/integration-example.ts` — simulação de integração entre serviços (checkout, estoque, notificações)
  - `src/index.ts` — ponto de entrada para executar os demos

- `tests/` — testes automatizados
  - `tests/arquitetura-eventos.test.ts` — validações básicas do Event Store e reconstrução

## Testes

Os testes cobrem os conceitos essenciais de Event Sourcing e integração dos módulos didáticos. Execute com:

```powershell
npm test
```

## Contribuição

Contribuições são bem-vindas — abra uma issue ou um pull request para sugerir melhorias, correções ou novos exemplos.

## Autor

Luis Oliveira (exemplos para a live)

## Licença

Veja o arquivo `LICENSE` ou adicione a licença desejada ao repositório.
# Arquitetura Orientada a Eventos (EDA) com TypeScript

Exemplos utilizados/planejados para a live **Arquitetura Orientada a Eventos – Desvendando o Poder da Reatividade no Desenvolvimento Fullstack**.

Baseado nos tópicos dos slides:- Conceitos de evento, produtor, consumidor, desacoplamento e plataforma de processamento- Modelos Pub/Sub e fluxo de eventos- Vantagens e desvantagens da EDA- Padrões em EDA: Pub/Sub, Event Sourcing, CQRS, Sagas- Aplicações práticas em sistemas distribuídos e fullstack## Requisitos- Node.js 18+- npm, yarn ou pnpm## Como rodar`bash# instalar dependênciasnpm install# rodar todos os exemplosnpm run dev# rodar testesnpm test# compilar para JavaScriptnpm run build# executar a versão compiladanpm start`## Arquivos principais- `src/concepts.ts` — define tipos básicos (Evento, Produtor, Consumidor, EventBus)- `src/pubsub-basic.ts` — exemplo de Pub/Sub em memória- `src/event-sourcing.ts` — pequeno Event Store em memória + reconstrução de estado- `src/cqrs-simplified.ts` — separação de comandos e queries usando eventos- `src/saga.ts` — exemplo de Saga para processo de pedido com compensações- `src/integration-example.ts` — simula microserviços (checkout, estoque, notificação) reagindo a eventos- `src/index.ts` — ponto de entrada que executa os demos na ordem didáticaOs testes em `tests/arquitetura-eventos.test.ts` validam o funcionamento básico do Event Store e da reconstrução de estado.
