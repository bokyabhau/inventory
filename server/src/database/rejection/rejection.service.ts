import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rejection, RejectionDocument } from './rejection.schema';
import { Model } from 'mongoose';
import { RejectionDto } from './rejection.types';

@Injectable()
export class RejectionService {
  constructor(
    @InjectModel(Rejection.name) private rejectionModel: Model<Rejection>,
  ) {}

  async getRejections(): Promise<RejectionDocument[]> {
    return this.rejectionModel.find().exec();
  }

  async addRejection(rejectionDto: RejectionDto): Promise<RejectionDocument> {
    const newRejection = new this.rejectionModel(rejectionDto);
    try {
      const createdRejection = await newRejection.save();
      return createdRejection;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editRejection(
    rejection: RejectionDocument,
  ): Promise<RejectionDocument> {
    try {
      const editedRejection = await this.rejectionModel.findByIdAndUpdate(
        rejection._id,
        { $set: { ...rejection } },
        { new: true },
      );
      return editedRejection;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteRejection(
    rejection: RejectionDocument,
  ): Promise<RejectionDocument> {
    try {
      await this.rejectionModel.deleteOne({ _id: rejection._id });
      return rejection;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
