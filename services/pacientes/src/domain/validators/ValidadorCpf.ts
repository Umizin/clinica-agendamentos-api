export class ValidadorCpf {
  static limpar(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  static validar(cpf: string): boolean {
    const numeros = ValidadorCpf.limpar(cpf);

    if (numeros.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(numeros)) {
      return false;
    }

    if (!ValidadorCpf.digitoValido(numeros, 9)) {
      return false;
    }

    if (!ValidadorCpf.digitoValido(numeros, 10)) {
      return false;
    }

    return true;
  }

  private static digitoValido(numeros: string, posicao: number): boolean {
    const tamanho = posicao;
    let soma = 0;

    for (let i = 0; i < tamanho; i++) {
      soma += parseInt(numeros[i], 10) * (posicao + 1 - i);
    }

    const resto = (soma * 10) % 11;
    const digito = resto === 10 ? 0 : resto;

    return digito === parseInt(numeros[posicao], 10);
  }
}
