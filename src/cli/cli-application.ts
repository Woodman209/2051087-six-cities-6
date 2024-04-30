/*
  Менеджер управления командами
  Задачи менеджера:
    - регистрация списка команд (раннее созданные классы)
    - разбор пользовательского ввода
    - запуск нужной команды
*/

import { Command } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';

// объект, где ключи - строки, а значения - тип, реализующий интерфейс Command
type CommandCollection = Record<string, Command>;

export class CLIApplication {

  // список всех команд
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) { }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The defult command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public proccessCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
