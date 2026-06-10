import { Request, Response } from 'express';
import { CriarAgendamento } from '../../application/usecases/CriarAgendamento';
import { ListarAgendamentos } from '../../application/usecases/ListarAgendamentos';

export class AgendamentoController {
  constructor(
    private criarAgendamento: CriarAgendamento,
    private listarAgendamentos: ListarAgendamentos
  ) {}

  criar = async (req: Request, res: Response) => {
    try {
      const agendamento = await this.criarAgendamento.executar(req.body);
      res.status(201).json(agendamento);
    } catch (erro) {
      res.status(400).json({ erro: (erro as Error).message });
    }
  };

  listar = async (_req: Request, res: Response) => {
    const agendamentos = await this.listarAgendamentos.executar();
    res.json(agendamentos);
  };
}
