import { Request, Response } from 'express';
import { CriarAgendamento } from '../../application/usecases/CriarAgendamento';
import { ListarAgendamentos } from '../../application/usecases/ListarAgendamentos';
import { ConfirmarAgendamento } from '../../application/usecases/ConfirmarAgendamento';

export class AgendamentoController {
  constructor(
    private criarAgendamento: CriarAgendamento,
    private listarAgendamentos: ListarAgendamentos,
    private confirmarAgendamento: ConfirmarAgendamento
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

  confirmar = async (req: Request, res: Response) => {
    try {
      const agendamento = await this.confirmarAgendamento.executar(req.params.id);
      res.json(agendamento);
    } catch (erro) {
      res.status(400).json({ erro: (erro as Error).message });
    }
  };
}
