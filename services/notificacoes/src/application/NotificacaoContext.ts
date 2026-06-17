import { NotificacaoStrategy } from '../domain/strategies/NotificacaoStrategy';

export class NotificacaoContext {
  constructor(private strategies: Record<string, NotificacaoStrategy>) {}

  async enviar(canal: string, pacienteId: string, mensagem: string): Promise<void> {
    const strategy = this.strategies[canal];
    if (!strategy) {
      throw new Error('Canal invalido');
    }
    await strategy.enviar(pacienteId, mensagem);
  }
}
