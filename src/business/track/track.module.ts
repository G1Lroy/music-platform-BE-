import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackServise } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackModel } from './model/tracks';
import { CommentModel, Comment } from './model/comments';
import { FilesService } from 'src/business/files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackModel }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentModel }]),
  ],
  controllers: [TrackController],
  providers: [TrackServise, FilesService],
})
export class TrackModule {}
