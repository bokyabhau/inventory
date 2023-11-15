import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { totalRejectionsValidator } from 'src/utils';
import { uniq } from 'lodash';
import { Part, PartSchema } from '../part/part.schema';
import { PartRejections } from './record.types';

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Record {
  @Prop({ required: true, unique: false })
  part: Part;

  @Prop({ required: true, min: 0 })
  loadNumber: number;

  @Prop({ required: true, min: 0 })
  numberOfParts: number;

  @Prop({ required: true })
  rejections: PartRejections[];

  @Prop({
    min: 0,
    validate: totalRejectionsValidator(),
  })
  totalRejections: number;

  @Prop({ required: true })
  shift: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
export type RecordDocument = HydratedDocument<Record>;

RecordSchema.pre('save', function () {
  const totalRejections = this.rejections.reduce((acc, rejection) => {
    acc += rejection.numberOfRejections;
    return acc;
  }, 0);

  this.totalRejections = totalRejections;
});
