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