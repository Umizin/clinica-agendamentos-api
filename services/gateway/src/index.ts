import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const pacientesUrl = process.env.PACIENTES_URL || 'http://localhost:3001';
const agendamentosUrl = process.env.AGENDAMENTOS_URL || 'http://localhost:3002';
const notificacoesUrl = process.env.NOTIFICACOES_URL || 'http://localhost:3003';

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', servicos: ['pacientes', 'agendamentos', 'notificacoes'] });
});

function reescreverCaminho(recurso: string) {
  return (caminho: string) => {
    if (caminho === '/' || caminho === '') {
      return `/${recurso}`;
    }
    return `/${recurso}${caminho}`;
  };
}

app.use('/api/pacientes', createProxyMiddleware({
  target: pacientesUrl,
  changeOrigin: true,
  pathRewrite: reescreverCaminho('pacientes')
}));

app.use('/api/agendamentos', createProxyMiddleware({
  target: agendamentosUrl,
  changeOrigin: true,
  pathRewrite: reescreverCaminho('agendamentos')
}));

app.use('/api/notificacoes', createProxyMiddleware({
  target: notificacoesUrl,
  changeOrigin: true,
  pathRewrite: reescreverCaminho('notificacoes')
}));

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`gateway na porta ${porta}`));
