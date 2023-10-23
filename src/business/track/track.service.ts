import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './model/tracks';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentDocument, Comment } from './model/comments';
import { CreateTrackDTO } from './dto/create-track.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FilesService, FilesType } from 'src/business/files/files.service';

@Injectable()
export class TrackServise {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FilesService,
  ) {}
  async create(
    dto: CreateTrackDTO,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const audioFile = this.fileService.createFile(FilesType.AUDIO, audio);
    const pictureFile = this.fileService.createFile(FilesType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listensCount: 0,
      audio: audioFile,
      picture: pictureFile,
    });
    return track;
  }
  async getAll(count = 10, ofset = 0): Promise<Track[]> {
    return await this.trackModel.find().skip(ofset).limit(count);
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track.id;
  }
  async addComment(dto: CreateCommentDTO): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment);
    await track.save();
    return comment;
  }
  async incrementListenCount(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listensCount++;
    track.save();
  }
  async search(query: string): Promise<Track[]> {
    return await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }
}
