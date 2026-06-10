import { PacienteGateway } from '../../domain/gateways/PacienteGateway';

export class PacienteHttpGateway implements PacienteGateway {
  constructor(private pacientesUrl: string) {}

  async existe(id: string): Promise<boolean> {
    try {
      const resposta = await fetch(`${this.pacientesUrl}/pacientes/${id}`);
      return resposta.ok;
    } catch {
      return false;
    }
  }
}
