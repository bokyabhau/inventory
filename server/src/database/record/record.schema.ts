import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { capitalize, numberOfRejectionsValidator } from 'src/utils';
import { Part } from '../part/part.schema';
import { Rejection } from '../rejection/rejection.schema';

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Record {
  @Prop({ required: true })
  part: Part;

  @Prop({ required: true, min: 0 })
  loadNumber: number;

  @Prop({ required: true, min: 0 })
  numberOfParts: number;

  @Prop({ required: true })
  rejection: Rejection;

  @Prop({
    min: 0,
    validate: numberOfRejectionsValidator,
  })
  numberOfRejections: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
export type RecordDocument = HydratedDocument<Record>;
