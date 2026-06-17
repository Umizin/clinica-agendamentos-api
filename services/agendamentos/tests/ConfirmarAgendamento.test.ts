import { AgendamentoRepositoryMemoria } from '../src/infrastructure/repositories/AgendamentoRepositoryMemoria';
import { AgendamentoFactory } from '../src/application/factories/AgendamentoFactory';
import { ConfirmarAgendamento } from '../src/application/usecases/ConfirmarAgendamento';

describe('ConfirmarAgendamento', () => {
  it('confirma agendamento pendente', async () => {
    const repository = new AgendamentoRepositoryMemoria();
    const factory = new AgendamentoFactory();
    const agendamento = factory.criar({
      pacienteId: 'p1',
      medico: 'Dr Carlos',
      data: '2026-06-20',
      hora: '10:00'
    });
    await repository.salvar(agendamento);

    const useCase = new ConfirmarAgendamento(repository);
    const confirmado = await useCase.executar(agendamento.id);

    expect(confirmado.status).toBe('confirmado');
  });

  it('falha quando agendamento nao existe', async () => {
    const useCase = new ConfirmarAgendamento(new AgendamentoRepositoryMemoria());
    await expect(useCase.executar('id-inexistente')).rejects.toThrow('Agendamento nao encontrado');
  });
});
