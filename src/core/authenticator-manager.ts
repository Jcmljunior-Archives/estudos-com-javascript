import { config } from 'dotenv';
import { EvebyBotOptions } from './eveby';

export const getToken = (options: EvebyBotOptions<any>): string => {
  config({
    path: `./environments/.env.${options.mode}`,
  });

  return `${process.env.DISCORD_TOKEN}`;
};
