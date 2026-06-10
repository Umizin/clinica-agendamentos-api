import { AgendamentoRepository } from '../../domain/repositories/AgendamentoRepository';
import { AgendamentoObserver } from '../../domain/observers/AgendamentoObserver';
import { PacienteGateway } from '../../domain/gateways/PacienteGateway';
import { AgendamentoFactory } from '../factories/AgendamentoFactory';

interface DadosCriarAgendamento {
  pacienteId: string;
  medico: string;
  data: string;
  hora: string;
}

export class CriarAgendamento {
  constructor(
    private repository: AgendamentoRepository,
    private factory: AgendamentoFactory,
    private pacienteGateway: PacienteGateway,
    private observers: AgendamentoObserver[]
  ) {}

  async executar(dados: DadosCriarAgendamento) {
    const pacienteExiste = await this.pacienteGateway.existe(dados.pacienteId);
    if (!pacienteExiste) {
      throw new Error('Paciente nao encontrado');
    }

    const conflitos = await this.repository.buscarPorPacienteEData(
      dados.pacienteId,
      dados.data
    );
    if (conflitos.some((a) => a.hora === dados.hora && a.status !== 'cancelado')) {
      throw new Error('Horario indisponivel');
    }

    const agendamento = this.factory.criar(dados);
    await this.repository.salvar(agendamento);

    for (const observer of this.observers) {
      await observer.aoCriar(agendamento);
    }

    return agendamento;
  }
}
