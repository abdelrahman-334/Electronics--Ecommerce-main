/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number; // Price of a single product
}

@Schema()
export class Order extends Document {
  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalPrice: number; // Total price of the entire order

  @Prop({ default: 'Pending' })
  status: string; // Order status (Pending, Completed, etc.)
}

export const OrderSchema = SchemaFactory.createForClass(Order);
