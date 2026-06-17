import { AgendamentoRepository } from '../../domain/repositories/AgendamentoRepository';

export class ConfirmarAgendamento {
  constructor(private repository: AgendamentoRepository) {}

  async executar(id: string) {
    const agendamento = await this.repository.buscarPorId(id);
    if (!agendamento) {
      throw new Error('Agendamento nao encontrado');
    }

    agendamento.confirmar();
    await this.repository.salvar(agendamento);
    return agendamento;
  }
}
