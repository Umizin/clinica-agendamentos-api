import { PacienteRepositoryMemoria } from '../src/infrastructure/repositories/PacienteRepositoryMemoria';
import { PacienteFactory } from '../src/application/factories/PacienteFactory';
import { CriarPaciente } from '../src/application/usecases/CriarPaciente';
import { BuscarPaciente } from '../src/application/usecases/BuscarPaciente';

describe('CriarPaciente', () => {
  let repository: PacienteRepositoryMemoria;
  let useCase: CriarPaciente;

  beforeEach(() => {
    repository = new PacienteRepositoryMemoria();
    useCase = new CriarPaciente(repository, new PacienteFactory());
  });

  it('cria paciente com dados validos', async () => {
    const paciente = await useCase.executar({
      nome: 'Ana Silva',
      cpf: '52998224725',
      email: 'ana@email.com'
    });

    expect(paciente.nome).toBe('Ana Silva');
    expect(paciente.cpf).toBe('52998224725');
    expect(paciente.id).toBeDefined();
  });

  it('rejeita cpf duplicado', async () => {
    const dados = { nome: 'Ana', cpf: '52998224725', email: 'ana@email.com' };
    await useCase.executar(dados);

    await expect(useCase.executar(dados)).rejects.toThrow('CPF ja cadastrado');
  });

  it('rejeita cpf invalido', async () => {
    await expect(
      useCase.executar({
        nome: 'Ana',
        cpf: '12345678901',
        email: 'ana@email.com'
      })
    ).rejects.toThrow('CPF invalido');
  });
});

describe('BuscarPaciente', () => {
  it('retorna paciente existente', async () => {
    const repository = new PacienteRepositoryMemoria();
    const criar = new CriarPaciente(repository, new PacienteFactory());
    const paciente = await criar.executar({
      nome: 'Joao',
      cpf: '39053344705',
      email: 'joao@email.com'
    });

    const buscar = new BuscarPaciente(repository);
    const encontrado = await buscar.executar(paciente.id);

    expect(encontrado.id).toBe(paciente.id);
  });

  it('falha quando paciente nao existe', async () => {
    const buscar = new BuscarPaciente(new PacienteRepositoryMemoria());
    await expect(buscar.executar('id-inexistente')).rejects.toThrow('Paciente nao encontrado');
  });
});
