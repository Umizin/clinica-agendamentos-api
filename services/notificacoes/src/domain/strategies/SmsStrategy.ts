import { NotificacaoStrategy } from './NotificacaoStrategy';

export class SmsStrategy implements NotificacaoStrategy {
  async enviar(pacienteId: string, mensagem: string): Promise<void> {
    console.log(`[sms] paciente ${pacienteId}: ${mensagem}`);
  }
}
