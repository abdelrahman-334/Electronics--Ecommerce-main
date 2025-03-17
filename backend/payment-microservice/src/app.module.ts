/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { paymentModule } from './payment/payment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    paymentModule,
    MongooseModule.forRoot(process.env.DB),
  ]
})
export class AppModule {}
