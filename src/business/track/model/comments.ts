import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Track } from './track';
import { Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Track' })
  track: Track; 
}

export const CommentModel = SchemaFactory.createForClass(Comment);
