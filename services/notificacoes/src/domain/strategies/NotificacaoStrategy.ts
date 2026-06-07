export interface NotificacaoStrategy {
  enviar(pacienteId: string, mensagem: string): Promise<void>;
}
