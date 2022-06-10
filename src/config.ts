export declare type configModeString = 'dev' | 'prod';

export declare type configOptions = {
  mode: configModeString;
  debug: boolean;
};

export const config: configOptions = {
  mode: 'dev',
  debug: true,
};
