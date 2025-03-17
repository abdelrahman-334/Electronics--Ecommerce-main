/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: Buffer,
    required: true,
  })
  image: Buffer;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: 0 })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
