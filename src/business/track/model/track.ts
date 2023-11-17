import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from './comments';
import { Types } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  title: string;
  
  @Prop()
  userId: string;

  @Prop()
  artist: string;

  @Prop()
  trackPath: string;

  @Prop()
  listensCount: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  fileExtension: { audio: string; image: string };

  @Prop({ type: Buffer })
  image: Buffer;

  @Prop({ type: Buffer })
  audio: Buffer;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackModel = SchemaFactory.createForClass(Track);
