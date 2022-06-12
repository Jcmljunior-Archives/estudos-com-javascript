declare namespace Eveby {
  /**
   * Mapeamento de opções.
   */
  type EvebyBotOptionsModeString = 'dev' | 'prod';
  type EvebyBotOptions<T> = {
    mode: EvebyBotOptionsModeString;
    debug: boolean;
  };

  /**
   * Responsável por gerenciar as funcionalidades do Bot.
   */
  type EvebyBot = (options: EvebyBotOptions) => Promise<EvebyBotDefinitions>;
  type EvebyBotDefinitions = {
    load: EvebyBotLoad<LoadAnswer[]>;
    run: EvebyBotRun<RunAnswer[]>;
  };

  /**
   * Responsavél pelo carregamento dos componentes.
   */
  type LoadAnswer = {
    status: boolean;
    data: string[];
  };
  type EvebyBotLoad = () => LoadAnswer[];

  /**
   * Responsavél pela execução dos compontentes.
   */
  type RunAnswer = {
    status: boolean;
  };
  type EvebyBotRun = () => RunAnswer[];
}

/**
 * Componentes do Bot.
 */
declare namespace Spices {
  type Events = () => any;
  type Extensions = () => any;
}

export { Eveby, Spices };
