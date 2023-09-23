import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartDto } from './part.types';
import { Part, PartDocument } from './part.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PartService {
  constructor(@InjectModel(Part.name) private partModel: Model<Part>) {}

  async getParts(): Promise<PartDocument[]> {
    return this.partModel.find().exec();
  }

  async addPart(partDto: PartDto): Promise<PartDocument> {
    const newPart = new this.partModel(partDto);
    try {
      const createdPart = await newPart.save();
      return createdPart;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editPart(part: PartDocument): Promise<PartDocument> {
    try {
      const editedPart = await this.partModel.findByIdAndUpdate(
        part._id,
        { $set: { ...part } },
        { new: true },
      );
      return editedPart;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePart(part: PartDocument): Promise<PartDocument> {
    try {
      await this.partModel.deleteOne({ _id: part._id });
      return part;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
