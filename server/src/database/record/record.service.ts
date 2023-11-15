import {
  Injectable,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RecordDto } from './record.types';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './record.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecordService {
  constructor(@InjectModel(Record.name) private recordModel: Model<Record>) {}

  async create(recordDto: RecordDto): Promise<Record> {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    let existingRecord = await this.recordModel.findOne({
      'part._id': recordDto.part._id,
      createdAt: { $gte: startOfToday },
      loadNumber: recordDto.loadNumber,
      shift: recordDto.shift,
    });

    if (existingRecord) {
      const rejections = [
        ...existingRecord.rejections,
        ...recordDto.rejections,
      ];

      const consolidatedRejections = rejections.reduce((acc, rejection) => {
        const existingRejection = rejections.filter(
          (r) => r.rejection._id === rejection.rejection._id,
        );
        const processedRejection = acc.find(
          (r) => r.rejection._id === rejection.rejection._id,
        );
        if (processedRejection) {
          if (existingRejection.length > 0) {
            rejection.numberOfRejections = existingRejection.reduce((t, c) => {
              t += c.numberOfRejections;
              return t;
            }, 0);
          }
        } else {
          acc.push(processedRejection);
        }
        return acc;
      }, []);

      existingRecord.rejections = consolidatedRejections;
      // existingRecord.rejections = existingRecord.rejections.reduce(
      //   (acc, cur) => {
      //     const existingRejection = recordDto.rejections.find(
      //       (r) => r.rejection.name === cur.rejection.name,
      //     );
      //     if (existingRejection) {
      //       cur.numberOfRejections += existingRejection.numberOfRejections;
      //     } else {
      //       acc.push(cur);
      //     }

      //     return acc;
      //   },
      //   [],
      // );
      // existingRecord.numberOfParts += recordDto.numberOfParts;

      try {
        const updatedRecord = await existingRecord.save();
        return updatedRecord;
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    try {
      const newRecord = new this.recordModel(recordDto);
      const createdRecord = await newRecord.save();
      return createdRecord;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async read(): Promise<Record[]> {
    return this.recordModel.find().exec();
  }
}
