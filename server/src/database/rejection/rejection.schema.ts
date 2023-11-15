import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Rejection {
  @Prop({ required: true, lowercase: true, trim: true })
  name: string;
}

export const RejectionSchema = SchemaFactory.createForClass(Rejection);
export type RejectionDocument = HydratedDocument<Rejection>;
