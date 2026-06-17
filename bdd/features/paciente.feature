# language: pt
Funcionalidade: Cadastro de paciente
  Para agendar consultas
  O sistema deve cadastrar pacientes

  Cenario: Cadastrar paciente valido
    Dado os dados do paciente "Ana Silva" com cpf "52998224725"
    Quando cadastro o paciente
    Entao o paciente deve ser salvo

  Cenario: Rejeitar cpf duplicado
    Dado os dados do paciente "Ana Silva" com cpf "52998224725"
    E cadastro o paciente
    Quando cadastro o paciente novamente
    Entao devo receber erro de cpf duplicado
