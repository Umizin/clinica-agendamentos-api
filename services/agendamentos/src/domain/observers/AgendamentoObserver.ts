import { Agendamento } from '../entities/Agendamento';

export interface AgendamentoObserver {
  aoCriar(agendamento: Agendamento): Promise<void>;
}
