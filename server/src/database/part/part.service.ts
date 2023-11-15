import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartDto } from './part.types';
import { Part, PartDocument } from './part.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PartService {
  constructor(@InjectModel(Part.name) private partModel: Model<Part>) {}

  async read(): Promise<PartDocument[]> {
    return this.partModel.find().exec();
  }

  async create(partDto: PartDto): Promise<PartDocument> {
    const newPart = new this.partModel(partDto);
    const existingPart = await this.partModel.count({ name: partDto.name });
    if (existingPart > 0) {
      throw new HttpException(
        `Part with name "${partDto.name}" already exists`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const createdPart = await newPart.save();
      return createdPart;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(part: PartDocument): Promise<PartDocument> {
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

  async delete(part: PartDocument): Promise<PartDocument> {
    try {
      await this.partModel.deleteOne({ _id: part._id });
      return part;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
