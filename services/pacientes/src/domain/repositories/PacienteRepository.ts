import { Paciente } from '../entities/Paciente';

export interface PacienteRepository {
  salvar(paciente: Paciente): Promise<void>;
  buscarPorId(id: string): Promise<Paciente | null>;
  buscarPorCpf(cpf: string): Promise<Paciente | null>;
  listar(): Promise<Paciente[]>;
}
