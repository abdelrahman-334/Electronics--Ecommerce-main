/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payment } from './payment.schema';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class paymentService {
  constructor(
    @InjectModel(payment.name) private paymentModel: Model<payment>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<payment[]> {
    return this.paymentModel.find().exec();
  }

  async findOne(req_body: any): Promise<any> {
    const payment = await this.paymentModel.find({order_id: req_body.order_id}).exec();
    return payment;
  }

  async remove(req_body: any): Promise<payment> {
    return this.paymentModel.findOneAndDelete({order_id:req_body.order_id}).exec();
  }
  async processPayment(req_body: any) {
    const url = 'https://accept.paymob.com/v1/intention/';
    const headers = {
      Authorization: `Bearer ${process.env.PAYMOB_SECRETKEY}`,
      'Content-Type': 'application/json',
    };
    const body = {
      amount: req_body.total,
      currency: 'EGP',
      payment_methods: [4913066],
      items: req_body.items,
      billing_data: {
        apartment: 'dumy',
        first_name: 'ala',
        last_name: 'zain',
        street: 'dumy',
        building: 'dumy',
        phone_number: '+92345xxxxxxxx',
        city: 'dumy',
        country: 'dumy',
        email: 'ali@gmail.com',
        floor: 'dumy',
        state: 'dumy',
      },
      extras: {
        ee: 22,
      },
      expiration: 3600,
      notification_url:
        'https://sloth-clever-gratefully.ngrok-free.app/payments/pay-response',
      redirection_url: 'https://sloth-clever-gratefully.ngrok-free.app/payments/pay',
    };

    try {
      
      const response = await axios.post(url, body, { headers });
      const newPayment = {
        'order_id' : response.data.payment_keys[0].order_id,
        'total': req_body.total,
        'items': req_body.items
      }
      console.log(newPayment)
      this.paymentModel.create(newPayment)
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Status code:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
  async getResponse(
     status: string,
     amount: string,
     order: number,
  ) {
    console.log('Status:', status);
    console.log('Amount:', amount);

    if (status == 'true'){
       await this.paymentModel.findOneAndUpdate(
        {order_id:order},
        {status:'successful'},
        {new:true}
      );
    }
    else{
      await this.paymentModel.findOneAndUpdate(
        {order_id:order},
        {status:'failed'},
        {new:true}
      );
    }
    return {
      message:"recieved call",
      status:status
    };
  }

}
