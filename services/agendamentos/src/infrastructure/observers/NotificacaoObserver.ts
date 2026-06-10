import { AgendamentoObserver } from '../../domain/observers/AgendamentoObserver';
import { Agendamento } from '../../domain/entities/Agendamento';

export class NotificacaoObserver implements AgendamentoObserver {
  constructor(private notificacoesUrl: string) {}

  async aoCriar(agendamento: Agendamento): Promise<void> {
    try {
      await fetch(`${this.notificacoesUrl}/notificacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pacienteId: agendamento.pacienteId,
          mensagem: `Consulta agendada com ${agendamento.medico} em ${agendamento.data} as ${agendamento.hora}`,
          canal: 'email'
        })
      });
    } catch {
      console.log('notificacao nao enviada');
    }
  }
}
