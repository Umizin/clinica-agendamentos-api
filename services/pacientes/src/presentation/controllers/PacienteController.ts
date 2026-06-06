import { Request, Response } from 'express';
import { CriarPaciente } from '../../application/usecases/CriarPaciente';
import { BuscarPaciente } from '../../application/usecases/BuscarPaciente';
import { PacienteRepository } from '../../domain/repositories/PacienteRepository';

export class PacienteController {
  constructor(
    private criarPaciente: CriarPaciente,
    private buscarPaciente: BuscarPaciente,
    private repository: PacienteRepository
  ) {}

  criar = async (req: Request, res: Response) => {
    try {
      const paciente = await this.criarPaciente.executar(req.body);
      res.status(201).json(paciente);
    } catch (erro) {
      res.status(400).json({ erro: (erro as Error).message });
    }
  };

  buscar = async (req: Request, res: Response) => {
    try {
      const paciente = await this.buscarPaciente.executar(req.params.id);
      res.json(paciente);
    } catch (erro) {
      res.status(404).json({ erro: (erro as Error).message });
    }
  };

  listar = async (_req: Request, res: Response) => {
    const pacientes = await this.repository.listar();
    res.json(pacientes);
  };
}
