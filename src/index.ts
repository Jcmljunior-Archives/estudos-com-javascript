import { config } from './config';
import { EvebyBot } from './core/eveby';

const Bot = EvebyBot(config);

Bot.load().then((response) => Bot.run(response));
