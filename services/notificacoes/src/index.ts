import express from 'express';
import { NotificacaoContext } from './application/NotificacaoContext';
import { EnviarNotificacao } from './application/usecases/EnviarNotificacao';
import { NotificacaoController } from './presentation/controllers/NotificacaoController';
import { Config } from './infrastructure/singleton/Config';

const app = express();
app.use(express.json());

const config = Config.obter();
const context = new NotificacaoContext();
const enviarNotificacao = new EnviarNotificacao(context);
const controller = new NotificacaoController(enviarNotificacao);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: config.appNome, versao: config.versao });
});

app.post('/notificacoes', controller.enviar);

const porta = process.env.PORT || 3003;
app.listen(porta, () => console.log(`notificacoes na porta ${porta}`));
