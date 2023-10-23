import { ObjectId } from 'mongoose';

export class CreateCommentDTO {
  readonly userName: string;
  readonly commentText: string;
  readonly trackId: ObjectId;
}
