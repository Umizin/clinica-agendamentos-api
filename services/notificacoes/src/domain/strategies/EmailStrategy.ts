import { NotificacaoStrategy } from './NotificacaoStrategy';

export class EmailStrategy implements NotificacaoStrategy {
  async enviar(pacienteId: string, mensagem: string): Promise<void> {
    console.log(`[email] paciente ${pacienteId}: ${mensagem}`);
  }
}
