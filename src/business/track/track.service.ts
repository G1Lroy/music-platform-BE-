import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './model/track';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentDocument, Comment } from './model/comments';
import { CreateTrackDTO } from './dto/create-track.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FilesService } from 'src/business/files/files.service';

export interface CustomTrack {
  _id?: string;
  title: string;
  artist: string;
  listensCount: number;
  fileExtension: {
    audio: string;
    image: string;
  };
  comments: Comment[];
  audio: string;
  image: string;
}

@Injectable()
export class TrackServise {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FilesService,
  ) {}
  async create(
    dto: CreateTrackDTO,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const audioType = await this.fileService.getFileExtension(audio);
    const imageType = await this.fileService.getFileExtension(image);
    const track = await this.trackModel.create({
      ...dto,
      listensCount: 0,
      fileExtension: { audio: audioType, image: imageType },
      audio: audio.buffer,
      image: image.buffer,
    });
    return track;
  }
  async getAll(count = 10, ofset = 0): Promise<CustomTrack[]> {
    const allTracks = await this.trackModel.find().skip(ofset).limit(count);
    await this.fileService.decodeAllBuffers(allTracks);
    // create new obj to client only usefull info
    const updatedTracks = allTracks.map((track) => {
      const updatedTrack: CustomTrack = { ...track.toObject() };
      delete updatedTrack.image;
      delete updatedTrack.audio;
      delete updatedTrack.fileExtension;
      updatedTrack.audio = `audio/${track.title}.${track.fileExtension.audio}`;
      updatedTrack.image = `image/${track.title}.${track.fileExtension.image}`;
      return updatedTrack;
    });
    return updatedTracks;
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
