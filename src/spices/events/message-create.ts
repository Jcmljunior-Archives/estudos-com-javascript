import { Event, EventOptions } from '../../core/event';

/**
 * Definições.
 */
const options: EventOptions = {
  options: {
    name: 'messageCreate',
  },
};

/**
 * Evento disparado a cada mensagem enviada pelo usuário.
 */
export const MessageCreate = ((Event) => {
  return {
    ...options,
    ...Event,
    run: () => {},
  };
})(Event);
