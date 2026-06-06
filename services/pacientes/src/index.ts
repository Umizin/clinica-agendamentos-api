import express from 'express';
import { PacienteFactory } from './application/factories/PacienteFactory';
import { CriarPaciente } from './application/usecases/CriarPaciente';
import { BuscarPaciente } from './application/usecases/BuscarPaciente';
import { PacienteRepositoryMemoria } from './infrastructure/repositories/PacienteRepositoryMemoria';
import { PacienteController } from './presentation/controllers/PacienteController';

const app = express();
app.use(express.json());

const repository = new PacienteRepositoryMemoria();
const factory = new PacienteFactory();
const criarPaciente = new CriarPaciente(repository, factory);
const buscarPaciente = new BuscarPaciente(repository);
const controller = new PacienteController(criarPaciente, buscarPaciente, repository);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.post('/pacientes', controller.criar);
app.get('/pacientes', controller.listar);
app.get('/pacientes/:id', controller.buscar);

const porta = process.env.PORT || 3001;
app.listen(porta, () => console.log(`pacientes na porta ${porta}`));
