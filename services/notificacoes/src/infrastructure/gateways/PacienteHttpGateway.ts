import { PacienteContato, PacienteGateway } from '../../domain/gateways/PacienteGateway';

export class PacienteHttpGateway implements PacienteGateway {
  constructor(private pacientesUrl: string) {}

  async buscarPorId(id: string): Promise<PacienteContato | null> {
    try {
      const resposta = await fetch(`${this.pacientesUrl}/pacientes/${id}`);
      if (!resposta.ok) return null;
      return resposta.json() as Promise<PacienteContato>;
    } catch {
      return null;
    }
  }
}
