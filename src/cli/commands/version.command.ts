/*
  Команда --version считывает из package.json версию приложения, т.е значение свойства version
  Для чтения файла используем фукнцию readFileSync модуля fs. С помощью функции readFileSync прочитаем файл package.json и укажем кодировку
  Перед чтением файла для преобразования относительного пути в абсолютный воспользуемся функцией resolve из модуля path
  Метод readVersion прочитает версию приложения
*/

import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) { }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.log(version);
    } catch (error: unknown) {
      console.log(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
