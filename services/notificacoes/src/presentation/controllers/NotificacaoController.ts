import { Request, Response } from 'express';
import { EnviarNotificacao } from '../../application/usecases/EnviarNotificacao';

export class NotificacaoController {
  constructor(private enviarNotificacao: EnviarNotificacao) {}

  enviar = async (req: Request, res: Response) => {
    try {
      const resultado = await this.enviarNotificacao.executar(req.body);
      res.status(201).json(resultado);
    } catch (erro) {
      res.status(400).json({ erro: (erro as Error).message });
    }
  };
}
