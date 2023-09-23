import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { capitalize } from 'src/utils';

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Rejection {
  @Prop({ required: true, lowercase: true, unique: true, get: capitalize })
  name: string;
}

export const RejectionSchema = SchemaFactory.createForClass(Rejection);
export type RejectionDocument = HydratedDocument<Rejection>;
