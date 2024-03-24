/*
  Класс TSFileReader реализует чтение и разбор tsv-файла
*/

import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

const CHUNK_SIZE = 16384; // 16КБ

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE, // размер буфера
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        // eslint-disable-next-line @typescript-eslint/no-shadow
        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }
    this.emit('end', importedRowCount);
  }
}


