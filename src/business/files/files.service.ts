import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';
import { Track } from '../track/model/tracks';

@Injectable()
export class FilesService {
  async getFileExtension(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    return fileExtension;
  }
  async saveFileStaticFolder(
    buffer: Buffer,
    fileExtension: string,
    title: string,
    type: string,
  ) {
    const filePath = resolve(__dirname, '../..', 'static', type);
    const fileName = title + '.' + fileExtension;
    try {
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
      await fs.promises.writeFile(resolve(filePath, fileName), buffer);
      return type + '/' + title;
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }
  async decodeAllBuffers(tracksResponse: Track[]) {
    for (const track of tracksResponse) {
      await this.saveFileStaticFolder(
        track.audio as Buffer,
        track.fileExtension.audio,
        track.title,
        'audio',
      );
      await this.saveFileStaticFolder(
        track.image as Buffer,
        track.fileExtension.image,
        track.title,
        'image',
      );
    }
  }
}
