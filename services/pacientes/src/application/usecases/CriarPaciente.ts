import { PacienteRepository } from '../../domain/repositories/PacienteRepository';
import { PacienteFactory } from '../factories/PacienteFactory';

interface DadosCriarPaciente {
  nome: string;
  cpf: string;
  email: string;
}

export class CriarPaciente {
  constructor(
    private repository: PacienteRepository,
    private factory: PacienteFactory
  ) {}

  async executar(dados: DadosCriarPaciente) {
    const existente = await this.repository.buscarPorCpf(dados.cpf);
    if (existente) {
      throw new Error('CPF ja cadastrado');
    }

    const paciente = this.factory.criar(dados);
    await this.repository.salvar(paciente);
    return paciente;
  }
}
