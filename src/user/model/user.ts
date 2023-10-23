import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CommentDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserModel = SchemaFactory.createForClass(User);
