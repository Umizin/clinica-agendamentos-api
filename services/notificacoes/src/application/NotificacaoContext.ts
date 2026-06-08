import { NotificacaoStrategy } from '../domain/strategies/NotificacaoStrategy';
import { EmailStrategy } from '../domain/strategies/EmailStrategy';
import { SmsStrategy } from '../domain/strategies/SmsStrategy';

export class NotificacaoContext {
  private strategies: Record<string, NotificacaoStrategy>;

  constructor() {
    this.strategies = {
      email: new EmailStrategy(),
      sms: new SmsStrategy()
    };
  }

  async enviar(canal: string, pacienteId: string, mensagem: string): Promise<void> {
    const strategy = this.strategies[canal];
    if (!strategy) {
      throw new Error('Canal invalido');
    }
    await strategy.enviar(pacienteId, mensagem);
  }
}
