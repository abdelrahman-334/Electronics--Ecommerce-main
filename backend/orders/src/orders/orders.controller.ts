/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, Get, Param, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('Authorization') authToken: string,
  ) {
    return this.ordersService.createOrder(createOrderDto, authToken);
  }

  @Post('/checkout')
  async checkout(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('Authorization') authToken: string,
    @Res() res: Response,
  ) {
    const order = await this.ordersService.createOrder(createOrderDto, authToken);

    // Redirect to Payment Microservice
    const paymentServiceUrl = `${process.env.PAYMENT_SERVICE_URL}/payments/pay`;
    const paymentBody = {
      order_id: order._id,
      total: order.totalPrice,
      items: order.items.map((item) => ({
        name: 'Product Name', // Replace with actual product name if available
        amount: item.price * item.quantity,
        description: 'Product description', // Replace with actual description
        quantity: item.quantity,
        
      })),
    };
    console.log(paymentBody.items)

    try {
      const paymentResponse = await fetch(paymentServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });

      const paymentData = await paymentResponse.json();
      console.log(`https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_jVNAQbLbeiXrC4uV4LUCQWhhL7da2WtZ&clientSecret=${paymentData.client_secret}`)
      return res.redirect(`https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_jVNAQbLbeiXrC4uV4LUCQWhhL7da2WtZ&clientSecret=${paymentData.client_secret}`);
      //  // Redirect to payment gateway
    } catch (error) {
      console.error('Error during payment processing:', error);
      return res.status(500).json({ message: 'Payment processing failed' });
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }
}
