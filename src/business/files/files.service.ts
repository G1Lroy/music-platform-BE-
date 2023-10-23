import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';

export enum FilesType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FilesService {
  createFile(type: FilesType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();      
      const fileID = v4() + '.' + fileExtension;
      const filePath = resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(resolve(filePath, fileID), file.buffer);
      return type + '/' + fileID;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile() {}
}
