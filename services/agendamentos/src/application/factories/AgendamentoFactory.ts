import { v4 as uuid } from 'uuid';
import { Agendamento } from '../../domain/entities/Agendamento';

interface DadosAgendamento {
  pacienteId: string;
  medico: string;
  data: string;
  hora: string;
}

export class AgendamentoFactory {
  criar(dados: DadosAgendamento): Agendamento {
    return new Agendamento(
      uuid(),
      dados.pacienteId,
      dados.medico,
      dados.data,
      dados.hora,
      'pendente'
    );
  }
}
