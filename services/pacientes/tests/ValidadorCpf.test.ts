import { ValidadorCpf } from '../src/domain/validators/ValidadorCpf';

describe('ValidadorCpf', () => {
  it('aceita cpf valido', () => {
    expect(ValidadorCpf.validar('52998224725')).toBe(true);
    expect(ValidadorCpf.validar('529.982.247-25')).toBe(true);
  });

  it('rejeita cpf com tamanho errado', () => {
    expect(ValidadorCpf.validar('123')).toBe(false);
  });

  it('rejeita cpf com digitos iguais', () => {
    expect(ValidadorCpf.validar('11111111111')).toBe(false);
  });

  it('rejeita cpf com verificador invalido', () => {
    expect(ValidadorCpf.validar('12345678901')).toBe(false);
  });
});
