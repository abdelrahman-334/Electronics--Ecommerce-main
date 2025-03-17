/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { paymentService } from './payment.service';

@Controller('payments')
export class paymentController {
  constructor(private readonly paymentService: paymentService) {}
  @Post('/pay')
  processPayment(@Body() body: any) {
    return this.paymentService.processPayment(body);
  }

  @Get('/pay')
  getResponse(
    @Query('success') status: string,
    @Query('amount_cents') amount: string,
    @Query('order') order: number,
  ) {
    return this.paymentService.getResponse(status, amount, order);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Body() body: any) {
    return this.paymentService.findOne(body.order_id);
  }
}
