# language: pt
Funcionalidade: Agendamento de consulta
  Para marcar atendimento medico
  O sistema deve criar agendamentos

  Cenario: Criar agendamento com sucesso
    Dado um paciente existente
    Quando agendo consulta com medico "Dr Carlos" em "2026-06-20" as "10:00"
    Entao o agendamento deve ficar pendente

  Cenario: Bloquear horario duplicado
    Dado um paciente existente
    E agendo consulta com medico "Dr Carlos" em "2026-06-20" as "10:00"
    Quando agendo consulta com medico "Dr Carlos" em "2026-06-20" as "10:00"
    Entao devo receber erro de horario indisponivel
