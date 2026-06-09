export interface PacienteGateway {
  existe(id: string): Promise<boolean>;
}
