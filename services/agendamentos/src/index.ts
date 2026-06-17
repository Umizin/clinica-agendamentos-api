import express from 'express';
import { AgendamentoFactory } from './application/factories/AgendamentoFactory';
import { CriarAgendamento } from './application/usecases/CriarAgendamento';
import { ListarAgendamentos } from './application/usecases/ListarAgendamentos';
import { ConfirmarAgendamento } from './application/usecases/ConfirmarAgendamento';
import { AgendamentoRepositoryMemoria } from './infrastructure/repositories/AgendamentoRepositoryMemoria';
import { NotificacaoObserver } from './infrastructure/observers/NotificacaoObserver';
import { PacienteHttpGateway } from './infrastructure/gateways/PacienteHttpGateway';
import { AgendamentoController } from './presentation/controllers/AgendamentoController';

const app = express();
app.use(express.json());

const pacientesUrl = process.env.PACIENTES_URL || 'http://localhost:3001';
const notificacoesUrl = process.env.NOTIFICACOES_URL || 'http://localhost:3003';

const repository = new AgendamentoRepositoryMemoria();
const factory = new AgendamentoFactory();
const pacienteGateway = new PacienteHttpGateway(pacientesUrl);
const observers = [new NotificacaoObserver(notificacoesUrl)];

const criarAgendamento = new CriarAgendamento(
  repository,
  factory,
  pacienteGateway,
  observers
);
const listarAgendamentos = new ListarAgendamentos(repository);
const confirmarAgendamento = new ConfirmarAgendamento(repository);
const controller = new AgendamentoController(
  criarAgendamento,
  listarAgendamentos,
  confirmarAgendamento
);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.post('/agendamentos', controller.criar);
app.get('/agendamentos', controller.listar);
app.patch('/agendamentos/:id/confirmar', controller.confirmar);

const porta = process.env.PORT || 3002;
app.listen(porta, () => console.log(`agendamentos na porta ${porta}`));
