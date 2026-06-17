import { NotificacaoContext } from '../src/application/NotificacaoContext';
import { EnviarNotificacao } from '../src/application/usecases/EnviarNotificacao';
import { NotificacaoStrategy } from '../src/domain/strategies/NotificacaoStrategy';

class CanalFake implements NotificacaoStrategy {
  constructor(private nome: string) {}

  async enviar(): Promise<void> {}
}

describe('EnviarNotificacao', () => {
  const useCase = new EnviarNotificacao(
    new NotificacaoContext({
      email: new CanalFake('email'),
      sms: new CanalFake('sms')
    })
  );

  it('envia por email', async () => {
    const resultado = await useCase.executar({
      pacienteId: 'p1',
      mensagem: 'Consulta confirmada',
      canal: 'email'
    });

    expect(resultado.enviado).toBe(true);
    expect(resultado.canal).toBe('email');
  });

  it('rejeita canal invalido', async () => {
    await expect(
      useCase.executar({
        pacienteId: 'p1',
        mensagem: 'teste',
        canal: 'whatsapp'
      })
    ).rejects.toThrow('Canal invalido');
  });
});
