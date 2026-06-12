import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';

const { PacienteRepositoryMemoria } = require('../../services/pacientes/dist/infrastructure/repositories/PacienteRepositoryMemoria');
const { PacienteFactory } = require('../../services/pacientes/dist/application/factories/PacienteFactory');
const { CriarPaciente } = require('../../services/pacientes/dist/application/usecases/CriarPaciente');

let repository: InstanceType<typeof PacienteRepositoryMemoria>;
let criarPaciente: InstanceType<typeof CriarPaciente>;
let dados: { nome: string; cpf: string; email: string };
let ultimoErro: string | null = null;
let pacienteSalvo = false;

Before(() => {
  repository = new PacienteRepositoryMemoria();
  criarPaciente = new CriarPaciente(repository, new PacienteFactory());
  dados = { nome: '', cpf: '', email: 'teste@email.com' };
  ultimoErro = null;
  pacienteSalvo = false;
});

Given('os dados do paciente {string} com cpf {string}', (nome: string, cpf: string) => {
  dados = { nome, cpf, email: `${cpf}@email.com` };
});

When('cadastro o paciente', async () => {
  try {
    await criarPaciente.executar(dados);
    pacienteSalvo = true;
    ultimoErro = null;
  } catch (erro) {
    ultimoErro = (erro as Error).message;
    pacienteSalvo = false;
  }
});

When('cadastro o paciente novamente', async () => {
  try {
    await criarPaciente.executar(dados);
    pacienteSalvo = true;
    ultimoErro = null;
  } catch (erro) {
    ultimoErro = (erro as Error).message;
    pacienteSalvo = false;
  }
});

Then('o paciente deve ser salvo', () => {
  assert.strictEqual(pacienteSalvo, true);
});

Then('devo receber erro de cpf duplicado', () => {
  assert.strictEqual(ultimoErro, 'CPF ja cadastrado');
});
