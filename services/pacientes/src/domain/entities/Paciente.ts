export class Paciente {
  constructor(
    public readonly id: string,
    public nome: string,
    public cpf: string,
    public email: string
  ) {}

  atualizarNome(nome: string): void {
    if (!nome.trim()) {
      throw new Error('Nome invalido');
    }
    this.nome = nome.trim();
  }
}
