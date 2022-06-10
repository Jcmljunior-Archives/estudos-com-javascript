export const Logger: CallableFunction = (key: number, length: number) => {
  const task = key <= 0 ? 'Evento' : 'Extensão';
  const lang = [
    [
      `[${task}] - Nenhum Evento encontrado.`,
      `[${task}] - 1 Evento encontrado.`,
      `[${task}] - ${length} Eventos encontrados.`,
    ],
    [
      `[${task}] - Nenhuma Extensão encontrada.`,
      `[${task}] - 1 Extensão encontrada.`,
      `[${task}] - ${length} Extensões encontradas.`,
    ],
  ];

  switch (length) {
    case 0:
      return lang[key][0];

    case 1:
      return lang[key][1];

    default:
      return lang[key][2];
  }
};
