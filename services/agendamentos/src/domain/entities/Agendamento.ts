export type StatusAgendamento = 'pendente' | 'confirmado' | 'cancelado';

export class Agendamento {
  constructor(
    public readonly id: string,
    public pacienteId: string,
    public medico: string,
    public data: string,
    public hora: string,
    public status: StatusAgendamento
  ) {}

  confirmar(): void {
    if (this.status === 'cancelado') {
      throw new Error('Agendamento cancelado');
    }
    this.status = 'confirmado';
  }

  cancelar(): void {
    this.status = 'cancelado';
  }
}
