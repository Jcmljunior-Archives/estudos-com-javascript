import { configOptions } from '../config';

export const ModeManager: CallableFunction =
  () =>
  (options: configOptions): boolean => {
    return options?.mode === 'dev' && options.debug ? true : false;
  };
