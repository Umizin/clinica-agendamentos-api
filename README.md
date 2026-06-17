# Clinica Agendamentos

Sistema de agendamento de consultas medicas com microsservicos.

Link publicado: substituir apos deploy

## Problema

Clinicas pequenas perdem tempo com agenda em planilha. Pacientes ligam para marcar consulta e a recepcao nao sabe se o horario esta livre. O sistema centraliza cadastro de pacientes, agendamentos e notificacoes.

## Microsservicos

| Servico       | Porta | Responsabilidade              |
|---------------|-------|-------------------------------|
| web           | 8080  | Interface para o professor    |
| gateway       | 3000  | Entrada unica da API          |
| pacientes     | 3001  | Cadastro e consulta pacientes |
| agendamentos  | 3002  | Criacao de consultas          |
| notificacoes  | 3003  | Envio email e sms             |

## Arquitetura Limpa

Cada servico segue as camadas:

```
src/
  domain/         entidades e contratos
  application/    casos de uso
  infrastructure/ implementacoes externas
  presentation/   controllers e rotas
```

Regra de dependencia: camadas internas nao conhecem as externas.

## SOLID

| Principio | Onde |
|-----------|------|
| S         | Cada use case tem uma acao |
| O         | Novos canais via Strategy sem alterar use case |
| L         | RepositorioMemoria substitui qualquer Repository |
| I         | Interfaces pequenas: PacienteRepository, PacienteGateway |
| D         | Use cases recebem abstracoes por construtor |

## Design Patterns

| Pattern    | Onde |
|------------|------|
| Repository | PacienteRepository, AgendamentoRepository |
| Factory    | PacienteFactory, AgendamentoFactory |
| Strategy   | EmailStrategy, SmsStrategy |
| Observer   | NotificacaoObserver em agendamentos |
| Singleton  | Config em notificacoes |
| Adapter    | PacienteHttpGateway em agendamentos e notificacoes |

## Clean Code

Nomes diretos em portugues. Funcoes curtas. Um arquivo por classe. Erros com mensagens claras. Sem logica duplicada entre servicos.

## TDD

Testes unitarios com Jest em cada servico. Escritos antes da logica de negocio.

```
cd services/pacientes && npm test
cd services/agendamentos && npm test
cd services/notificacoes && npm test
```

## BDD

Cenarios Gherkin em portugues na pasta bdd.

```
npm install
npm run test:bdd
```

## Frontend

Interface React com Tailwind na pasta `services/web`.

```
cd services/web
npm install
npm run dev
```

Abra `http://localhost:8080` com o gateway rodando na porta 3000.

## Docker

```
docker compose up --build
```

Abra `http://localhost:8080` para usar o sistema.

Endpoints da API via gateway:

```
GET  http://localhost:3000/health
POST http://localhost:3000/api/pacientes
GET  http://localhost:3000/api/pacientes
POST http://localhost:3000/api/agendamentos
GET  http://localhost:3000/api/agendamentos
POST http://localhost:3000/api/notificacoes
```

Exemplo cadastro:

```json
POST /api/pacientes
{
  "nome": "Ana Silva",
  "cpf": "52998224725",
  "email": "ana@email.com"
}
```

Exemplo agendamento:

```json
POST /api/agendamentos
{
  "pacienteId": "id-retornado",
  "medico": "Dr Carlos",
  "data": "2026-06-20",
  "hora": "10:00"
}
```

## Justificativas

Node e TypeScript pela velocidade de entrega e tipagem estatica. Memoria em vez de banco para reduzir infra na prova, mantendo Repository pronto para trocar por PostgreSQL. Gateway separa roteamento da regra de negocio. Observer desacopla agendamento de notificacao. Strategy permite novos canais sem mudar EnviarNotificacao. Frontend consome a API sem duplicar regra de negocio.
