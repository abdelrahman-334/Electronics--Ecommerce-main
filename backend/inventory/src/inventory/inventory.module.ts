/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema} from './inventory.model'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: InventorySchema }]),
  ],
  providers: [InventoryService],
  controllers: [InventoryController]
})
export class InventoryModule {}
