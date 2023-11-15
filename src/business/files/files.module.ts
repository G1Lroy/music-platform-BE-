import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, File } from './files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
