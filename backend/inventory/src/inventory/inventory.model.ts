/* eslint-disable prettier/prettier */
import { Schema,Document,model } from 'mongoose';

export interface Inventory extends Document {
  readonly name: string;
   quantity: number;
  readonly restockthresh: number;
   lastupdated: Date;
}

export const InventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  restockthresh: {
    type: Number,
    required: true,
  },
  lastupdate: {
    type: Date,
    default: Date.now,
  }
});

export const InventoryModel = model<Inventory>('InventorySchema', InventorySchema);