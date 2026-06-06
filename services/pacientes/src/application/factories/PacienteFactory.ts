import { v4 as uuid } from 'uuid';
import { Paciente } from '../../domain/entities/Paciente';

interface DadosPaciente {
  nome: string;
  cpf: string;
  email: string;
}

export class PacienteFactory {
  criar(dados: DadosPaciente): Paciente {
    return new Paciente(uuid(), dados.nome, dados.cpf, dados.email);
  }
}
