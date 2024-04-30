/*
  Команда --generate генерирует предложение по аренде жилья
  Аргументы:
    <count> - обязательный. Количество предложения для генерации
    <filepath> - обязательный. Путь к файлу для записи результата
    <url> - обязательный. URl сервиса (JSON-Server)
  Пример вызова команды:
    npm run ts ./src/main.cli.ts -- --generate 10 ./mocks/mock-offers.tsv http://localhost:3123/api
*/

import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import got from 'got';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\t generate data');

      console.error(getErrorMessage(error));
    }
  }
}
