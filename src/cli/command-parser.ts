/*
  Парсер, который разбирает пользовательский ввод
  Например, если пользователь вводит `--help`, необходимо разобрать эту строку в более удобную структуру
  Пример:
    {
      "--import": ["../../mocks/mock-data.tsv"]
    }
*/

type ParseCommand = Record<string, string[]>;

export class CommandParser {
  static parse(cliArguments: string[]): ParseCommand {
    const parsedCommand: ParseCommand = {};
    let currentCommand = '';

    cliArguments.forEach((item) => {
      if (item.startsWith('--')) {
        parsedCommand[item] = [];
        currentCommand = item;
      } else if (currentCommand && item) {
        parsedCommand[currentCommand].push(item);
      }
    });
    return parsedCommand;
  }
}


