/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { payment, paymentSchema } from './payment.schema';
import { paymentService } from './payment.service';
import { paymentController } from './payment.controller';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: payment.name, schema: paymentSchema }]),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes it accessible in all modules
    }),
  ],
  controllers: [paymentController],
  providers: [paymentService],
})
export class paymentModule {}
