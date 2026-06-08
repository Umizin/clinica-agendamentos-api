import { NotificacaoContext } from '../NotificacaoContext';

interface DadosNotificacao {
  pacienteId: string;
  mensagem: string;
  canal: string;
}

export class EnviarNotificacao {
  constructor(private context: NotificacaoContext) {}

  async executar(dados: DadosNotificacao) {
    await this.context.enviar(dados.canal, dados.pacienteId, dados.mensagem);
    return { enviado: true, canal: dados.canal };
  }
}
