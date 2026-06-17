import { Resend } from 'resend';
import { PacienteGateway } from '../gateways/PacienteGateway';
import { NotificacaoStrategy } from './NotificacaoStrategy';

export class EmailStrategy implements NotificacaoStrategy {
  private resend: Resend | null;

  constructor(
    private pacienteGateway: PacienteGateway,
    apiKey?: string
  ) {
    this.resend = apiKey ? new Resend(apiKey) : null;
  }

  async enviar(pacienteId: string, mensagem: string): Promise<void> {
    const paciente = await this.pacienteGateway.buscarPorId(pacienteId);
    if (!paciente) {
      throw new Error('Paciente nao encontrado');
    }

    if (!this.resend) {
      console.log(`[email] ${paciente.email}: ${mensagem}`);
      return;
    }

    const remetente = process.env.RESEND_FROM || 'onboarding@resend.dev';

    await this.resend.emails.send({
      from: remetente,
      to: paciente.email,
      subject: 'Clinica Agendamentos',
      text: mensagem
    });
  }
}
