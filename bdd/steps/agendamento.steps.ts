import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';

const { AgendamentoRepositoryMemoria } = require('../../services/agendamentos/dist/infrastructure/repositories/AgendamentoRepositoryMemoria');
const { AgendamentoFactory } = require('../../services/agendamentos/dist/application/factories/AgendamentoFactory');
const { CriarAgendamento } = require('../../services/agendamentos/dist/application/usecases/CriarAgendamento');

class PacienteFake {
  async existe(): Promise<boolean> {
    return true;
  }
}

class ObserverVazio {
  async aoCriar(): Promise<void> {}
}

let criarAgendamento: InstanceType<typeof CriarAgendamento>;
let ultimoAgendamento: { status: string } | null = null;
let ultimoErro: string | null = null;

Before(() => {
  const repository = new AgendamentoRepositoryMemoria();
  criarAgendamento = new CriarAgendamento(
    repository,
    new AgendamentoFactory(),
    new PacienteFake(),
    [new ObserverVazio()]
  );
  ultimoAgendamento = null;
  ultimoErro = null;
});

Given('um paciente existente', () => {});

When(
  'agendo consulta com medico {string} em {string} as {string}',
  async (medico: string, data: string, hora: string) => {
    try {
      ultimoAgendamento = await criarAgendamento.executar({
        pacienteId: 'p1',
        medico,
        data,
        hora
      });
      ultimoErro = null;
    } catch (erro) {
      ultimoErro = (erro as Error).message;
      ultimoAgendamento = null;
    }
  }
);

Then('o agendamento deve ficar pendente', () => {
  assert.strictEqual(ultimoAgendamento?.status, 'pendente');
});

Then('devo receber erro de horario indisponivel', () => {
  assert.strictEqual(ultimoErro, 'Horario indisponivel');
});
