# Clinica Agendamentos

Sistema de agendamento de consultas medicas com microsservicos.

Link publicado: pendente

## Problema

Clinicas pequenas perdem tempo com agenda em planilha. Pacientes ligam para marcar consulta e a recepcao nao sabe se o horario esta livre. O sistema centraliza cadastro de pacientes, agendamentos e notificacoes.

## Microsservicos

| Servico       | Porta | Responsabilidade              |
|---------------|-------|-------------------------------|
| gateway       | 3000  | Entrada unica da API          |
| pacientes     | 3001  | Cadastro e consulta pacientes |
| agendamentos  | 3002  | Criacao de consultas          |
| notificacoes  | 3003  | Envio email e sms             |
