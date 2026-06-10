import { AgendamentoRepository } from '../../domain/repositories/AgendamentoRepository';

export class ListarAgendamentos {
  constructor(private repository: AgendamentoRepository) {}

  async executar() {
    return this.repository.listar();
  }
}
