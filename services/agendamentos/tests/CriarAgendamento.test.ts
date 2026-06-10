import { AgendamentoRepositoryMemoria } from '../src/infrastructure/repositories/AgendamentoRepositoryMemoria';
import { AgendamentoFactory } from '../src/application/factories/AgendamentoFactory';
import { CriarAgendamento } from '../src/application/usecases/CriarAgendamento';
import { AgendamentoObserver } from '../src/domain/observers/AgendamentoObserver';
import { Agendamento } from '../src/domain/entities/Agendamento';
import { PacienteGateway } from '../src/domain/gateways/PacienteGateway';

class PacienteFake implements PacienteGateway {
  async existe(): Promise<boolean> {
    return true;
  }
}

class ObserverFake implements AgendamentoObserver {
  eventos: Agendamento[] = [];

  async aoCriar(agendamento: Agendamento): Promise<void> {
    this.eventos.push(agendamento);
  }
}

describe('CriarAgendamento', () => {
  let repository: AgendamentoRepositoryMemoria;
  let observer: ObserverFake;
  let useCase: CriarAgendamento;

  beforeEach(() => {
    repository = new AgendamentoRepositoryMemoria();
    observer = new ObserverFake();
    useCase = new CriarAgendamento(
      repository,
      new AgendamentoFactory(),
      new PacienteFake(),
      [observer]
    );
  });

  it('cria agendamento valido', async () => {
    const agendamento = await useCase.executar({
      pacienteId: 'p1',
      medico: 'Dr Carlos',
      data: '2026-06-20',
      hora: '10:00'
    });

    expect(agendamento.status).toBe('pendente');
    expect(observer.eventos).toHaveLength(1);
  });

  it('bloqueia horario duplicado', async () => {
    const dados = {
      pacienteId: 'p1',
      medico: 'Dr Carlos',
      data: '2026-06-20',
      hora: '10:00'
    };

    await useCase.executar(dados);
    await expect(useCase.executar(dados)).rejects.toThrow('Horario indisponivel');
  });
});
