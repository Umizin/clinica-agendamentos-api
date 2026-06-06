import { PacienteRepository } from '../../domain/repositories/PacienteRepository';

export class BuscarPaciente {
  constructor(private repository: PacienteRepository) {}

  async executar(id: string) {
    const paciente = await this.repository.buscarPorId(id);
    if (!paciente) {
      throw new Error('Paciente nao encontrado');
    }
    return paciente;
  }
}
