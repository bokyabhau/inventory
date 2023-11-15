import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Part {
  @Prop({
    required: true,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({ required: false, lowercase: true })
  description: string;

  @Prop({ required: false })
  avatar: string;
}

export const PartSchema = SchemaFactory.createForClass(Part);
export type PartDocument = HydratedDocument<Part>;
