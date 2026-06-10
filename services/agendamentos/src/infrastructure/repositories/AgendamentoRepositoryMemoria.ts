import { Agendamento } from '../../domain/entities/Agendamento';
import { AgendamentoRepository } from '../../domain/repositories/AgendamentoRepository';

export class AgendamentoRepositoryMemoria implements AgendamentoRepository {
  private itens = new Map<string, Agendamento>();

  async salvar(agendamento: Agendamento): Promise<void> {
    this.itens.set(agendamento.id, agendamento);
  }

  async buscarPorId(id: string): Promise<Agendamento | null> {
    return this.itens.get(id) ?? null;
  }

  async listar(): Promise<Agendamento[]> {
    return Array.from(this.itens.values());
  }

  async buscarPorPacienteEData(pacienteId: string, data: string): Promise<Agendamento[]> {
    return Array.from(this.itens.values()).filter(
      (a) => a.pacienteId === pacienteId && a.data === data
    );
  }
}
