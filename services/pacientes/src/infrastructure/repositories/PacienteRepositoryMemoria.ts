import { Paciente } from '../../domain/entities/Paciente';
import { PacienteRepository } from '../../domain/repositories/PacienteRepository';

export class PacienteRepositoryMemoria implements PacienteRepository {
  private itens = new Map<string, Paciente>();

  async salvar(paciente: Paciente): Promise<void> {
    this.itens.set(paciente.id, paciente);
  }

  async buscarPorId(id: string): Promise<Paciente | null> {
    return this.itens.get(id) ?? null;
  }

  async buscarPorCpf(cpf: string): Promise<Paciente | null> {
    for (const paciente of this.itens.values()) {
      if (paciente.cpf === cpf) return paciente;
    }
    return null;
  }

  async listar(): Promise<Paciente[]> {
    return Array.from(this.itens.values());
  }
}
