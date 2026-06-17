import express from 'express';
import { NotificacaoContext } from './application/NotificacaoContext';
import { EnviarNotificacao } from './application/usecases/EnviarNotificacao';
import { EmailStrategy } from './domain/strategies/EmailStrategy';
import { SmsStrategy } from './domain/strategies/SmsStrategy';
import { PacienteHttpGateway } from './infrastructure/gateways/PacienteHttpGateway';
import { NotificacaoController } from './presentation/controllers/NotificacaoController';
import { Config } from './infrastructure/singleton/Config';

const app = express();
app.use(express.json());

function urlServico(valor: string | undefined, local: string): string {
  const url = valor || local;
  return url.startsWith('http') ? url : `http://${url}`;
}

const pacientesUrl = urlServico(process.env.PACIENTES_URL, 'http://localhost:3001');
const pacienteGateway = new PacienteHttpGateway(pacientesUrl);

const context = new NotificacaoContext({
  email: new EmailStrategy(pacienteGateway, process.env.RESEND_API_KEY),
  sms: new SmsStrategy()
});

const config = Config.obter();
const enviarNotificacao = new EnviarNotificacao(context);
const controller = new NotificacaoController(enviarNotificacao);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: config.appNome,
    versao: config.versao,
    email: process.env.RESEND_API_KEY ? 'resend' : 'simulado'
  });
});

app.post('/notificacoes', controller.enviar);

const porta = process.env.PORT || 3003;
app.listen(porta, () => console.log(`notificacoes na porta ${porta}`));
