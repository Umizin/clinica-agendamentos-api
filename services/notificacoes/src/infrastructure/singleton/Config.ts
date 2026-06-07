export class Config {
  private static instancia: Config;

  readonly appNome = 'notificacoes';
  readonly versao = '1.0.0';

  private constructor() {}

  static obter(): Config {
    if (!Config.instancia) {
      Config.instancia = new Config();
    }
    return Config.instancia;
  }
}
