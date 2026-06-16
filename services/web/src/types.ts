export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
}

export interface Agendamento {
  id: string;
  pacienteId: string;
  medico: string;
  data: string;
  hora: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
}

export type Aba = 'pacientes' | 'agendamentos';
