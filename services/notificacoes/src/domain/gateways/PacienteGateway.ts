export interface PacienteContato {
  id: string;
  nome: string;
  email: string;
}

export interface PacienteGateway {
  buscarPorId(id: string): Promise<PacienteContato | null>;
}
