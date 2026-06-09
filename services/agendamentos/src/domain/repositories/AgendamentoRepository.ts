import { Agendamento } from '../entities/Agendamento';

export interface AgendamentoRepository {
  salvar(agendamento: Agendamento): Promise<void>;
  buscarPorId(id: string): Promise<Agendamento | null>;
  listar(): Promise<Agendamento[]>;
  buscarPorPacienteEData(pacienteId: string, data: string): Promise<Agendamento[]>;
}
