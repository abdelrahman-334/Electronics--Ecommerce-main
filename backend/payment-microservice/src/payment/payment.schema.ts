/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface Item {
  name: string;
  amount: number;
  description: string;
  quantity: number;
}

@Schema()
export class payment extends Document {
  @Prop({ required: true })
  order_id: number;

  @Prop({ required: true })
  total: number;

  @Prop()
  items: Item[];

  @Prop({ default: 'pending' })
  status: string;
}

export const paymentSchema = SchemaFactory.createForClass(payment);
