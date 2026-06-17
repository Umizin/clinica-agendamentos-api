import { PacienteRepository } from '../../domain/repositories/PacienteRepository';
import { PacienteFactory } from '../factories/PacienteFactory';
import { ValidadorCpf } from '../../domain/validators/ValidadorCpf';

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
    const cpf = ValidadorCpf.limpar(dados.cpf);

    if (!ValidadorCpf.validar(cpf)) {
      throw new Error('CPF invalido');
    }

    const existente = await this.repository.buscarPorCpf(cpf);
    if (existente) {
      throw new Error('CPF ja cadastrado');
    }

    const paciente = this.factory.criar({ ...dados, cpf });
    await this.repository.salvar(paciente);
    return paciente;
  }
}
