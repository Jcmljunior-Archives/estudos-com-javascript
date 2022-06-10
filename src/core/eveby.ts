import { Client, Collection, Intents } from 'discord.js';
import { EventManager } from './event-manager';
import { Logger } from './logger';

/**
 * Mapeamento de opções.
 */
export declare type EvebyBotOptionsModeString = 'dev' | 'prod';
export declare type EvebyBotOptions<T> = {
  mode: EvebyBotOptionsModeString;
  debug: boolean;
};

/**
 * Mapeamento de dados.
 */
declare type Resource = {
  status: boolean;
  data: string[];
};
declare type ResourceMap = Resource[];

/**
 * Discord API
 */
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

/**
 * Define o objeto circular cache.
 */
const cache: Collection<string, any> = new Collection();

/**
 * Responsável por gerenciar as funcionalidades do Bot.
 * @param options Configurações iniciais.
 */
export const EvebyBot = (options?: EvebyBotOptions<any>) => {
  return {
    /**
     * Responsável por carregar as funcionalidades.
     */
    load: async (): Promise<ResourceMap> => {
      /**
       * Definições de Eventos.
       */
      const events: CallableFunction = (): Resource => {
        /**
         * Retorna uma lista de Eventos.
         */
        const getAllEvents: CallableFunction = (): string[] => {
          const { listEvents, filter, getPath } = EventManager();
          const response: string[] = filter()(
            listEvents()(getPath()),
            (file: string) => file.endsWith('.js'),
          );

          return response;
        };

        return {
          status: getAllEvents().length ? true : false,
          data: getAllEvents(),
        };
      };

      /**
       * Definições de Extensões.
       */
      const extensions: CallableFunction = (): Resource => {
        /**
         * Retorna uma lista de extensões.
         */
        const getAllExtensions: CallableFunction = (): string[] => {
          return [];
        };

        return {
          status: getAllExtensions().length ? true : false,
          data: getAllExtensions(),
        };
      };

      return [
        {
          status: events().status,
          data: events().data,
        },
        {
          status: extensions().status,
          data: extensions().data,
        },
      ];
    },

    /**
     * Responsável por executar as funcionalidades.
     */
    run: async (resources: ResourceMap) => {
      if (options?.mode === 'dev' && options.debug) {
        for (const [key, val] of Object.entries(resources)) {
          console.log(Logger(key, val.data.length));
        }
      }

      /**
       * Definições de Eventos.
       */
      const events = () => {
        const set: CallableFunction = (resources: ResourceMap) => {
          if (!resources[0].status) return;

          const { getPath } = EventManager();
          let obj: any;

          /**
           * Define a base de dados.
           */
          cache.set('events', new Collection());

          /**
           * Percorre a lista de Eventos.
           */
          resources[0].data.forEach((file: string) => {
            /**
             * Importar o objeto.
             */
            obj = require(getPath().concat(file));
            obj = obj[Object.keys(obj)[0]];

            /**
             * Registra o objeto.
             */
            cache.get('events').set(obj.options.name, obj);
            client.on(obj.options.name, (...args: string[]) => {
              return obj.run();
            });
          });
        };

        /**
         * Inicializa a importação de eventos.
         */
        set(resources);

        return {
          status:
            cache.has('events') &&
            Array.from(cache.get('events').values()).length
              ? true
              : false,
        };
      };

      if (options?.mode === 'dev' && options.debug && !events().status)
        console.log('Oppsss, ocorreu um erro durante o processo.');
    },
  };
};
