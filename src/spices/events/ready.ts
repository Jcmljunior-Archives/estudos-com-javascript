import { Event, EventOptions } from '../../core/event';

const options: EventOptions = {
  options: {
    name: 'ready',
  },
};

export const Ready = ((Event) => {
  return {
    ...options,
    ...Event,
    run: () => {
      console.log('Running...');
    },
  };
})(Event);
