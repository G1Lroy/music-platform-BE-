import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Comment } from './comments';
import { Types } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  trackPath: string;

  @Prop()
  listensCount: number;

  @Prop()
  image: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackModel = SchemaFactory.createForClass(Track);
