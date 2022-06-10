import { lstatSync, readdirSync } from 'fs';

declare type DiscordEventString =
  | 'applicationCommandCreate'
  | 'applicationCommandDelete'
  | 'applicationCommandUpdate'
  | 'channelCreate'
  | 'channelDelete'
  | 'channelPinsUpdate'
  | 'channelUpdate'
  | 'debug'
  | 'warn'
  | 'error'
  | 'emojiCreate'
  | 'emojiDelete'
  | 'emojiUpdate'
  | 'guildBanAdd'
  | 'guildBanRemove'
  | 'guildCreate'
  | 'guildDelete'
  | 'guildUnavailable'
  | 'guildIntegrationsUpdate'
  | 'guildMemberAdd'
  | 'guildMemberAvailable'
  | 'guildMemberRemove'
  | 'guildMembersChunk'
  | 'guildMemberUpdate'
  | 'guildUpdate'
  | 'inviteCreate'
  | 'inviteDelete'
  | 'message'
  | 'messageCreate'
  | 'messageDelete'
  | 'messageReactionRemoveAll'
  | 'messageReactionRemoveEmoji'
  | 'messageDeleteBulk'
  | 'messageReactionAdd'
  | 'messageReactionRemove'
  | 'messageUpdate'
  | 'presenceUpdate'
  | 'rateLimit'
  | 'invalidRequestWarning'
  | 'ready'
  | 'invalidated'
  | 'roleCreate'
  | 'roleDelete'
  | 'roleUpdate'
  | 'threadCreate'
  | 'threadDelete'
  | 'threadListSync'
  | 'threadMemberUpdate'
  | 'threadMembersUpdate'
  | 'threadUpdate'
  | 'typingStart'
  | 'userUpdate'
  | 'voiceStateUpdate'
  | 'webhookUpdate'
  | 'interaction'
  | 'interactionCreate'
  | 'shardDisconnect'
  | 'shardError'
  | 'shardReady'
  | 'shardReconnecting'
  | 'shardResume'
  | 'stageInstanceCreate'
  | 'stageInstanceUpdate'
  | 'stageInstanceDelete'
  | 'stickerCreate'
  | 'stickerDelete'
  | 'stickerUpdate';

export declare type EventOptions = {
  options: {
    name?: DiscordEventString;
  };
};

/**
 * Gerenciador de Eventos.
 */
export const EventManager = () => {
  return {
    /**
     * Retorna o caminho absoluto até o diretório de eventos.
     */
    getPath: (): string => {
      return process.cwd().concat('/dist/spices/events/');
    },

    /**
     * Responsável por listar eventos.
     */
    listEvents: (): CallableFunction => {
      return (path: string): string[] => {
        return readdirSync(path);
      };
    },

    /**
     * Responsavel por filtrar os dados.
     */
    filter: (): CallableFunction => {
      return (response: string[], callback: CallableFunction): string[] => {
        return response.filter((element: string) => callback(element));
      };
    },

    /**
     * Responsável por filtrar diretórios.
     */
    isDirectory: (path: string): boolean => {
      return lstatSync(path).isDirectory();
    },

    /**
     * Responsavel por invocar funções.
     */
    pipe: (...fnc: CallableFunction[]): CallableFunction => {
      return fnc.reduce(
        (acc: CallableFunction, fnc: CallableFunction): CallableFunction => {
          return fnc(acc);
        },
      );
    },
  };
};
