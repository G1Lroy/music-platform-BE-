import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CustomTrack, TrackServise } from './track.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackServise) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    @Body() dto: CreateTrackDTO,
  ) {
    const { audio, image } = files;
    return this.trackService.create(dto, image[0], audio[0]);
  }

  @Get()
  getAll(
    @Query('count') count: number,
    @Query('ofset') ofset: number,
  ): Promise<CustomTrack[]> {
    return this.trackService.getAll(count, ofset);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('comment')
  addComment(@Body() dto: CreateCommentDTO) {
    return this.trackService.addComment(dto);
  }

  @Post('listen/:id')
  incrementListenCount(@Param('id') id: ObjectId) {
    return this.trackService.incrementListenCount(id);
  }
}
