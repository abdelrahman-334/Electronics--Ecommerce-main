/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.DB), InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
