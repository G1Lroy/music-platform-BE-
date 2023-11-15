import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackServise } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackModel } from './model/tracks';
import { CommentModel, Comment } from './model/comments';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackModel }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentModel }]),
    FilesModule,
  ],
  controllers: [TrackController],
  providers: [TrackServise],
})
export class TrackModule {}
