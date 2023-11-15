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

  async read(): Promise<RejectionDocument[]> {
    return this.rejectionModel.find().exec();
  }

  async create(rejectionDto: RejectionDto): Promise<RejectionDocument> {
    const newRejection = new this.rejectionModel(rejectionDto);
    const existingRejection = await this.rejectionModel.count({
      name: rejectionDto.name,
    });
    if (existingRejection > 0) {
      throw new HttpException(
        `Rejection "${rejectionDto.name}" already exists`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const createdRejection = await newRejection.save();
      return createdRejection;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(rejection: RejectionDocument): Promise<RejectionDocument> {
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

  async delete(rejection: RejectionDocument): Promise<RejectionDocument> {
    try {
      await this.rejectionModel.deleteOne({ _id: rejection._id });
      return rejection;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
