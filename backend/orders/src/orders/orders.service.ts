/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto, authToken: string): Promise<Order> {
    const { items } = createOrderDto;
    let totalPrice = 0;

    // Validate and process each item in the order
    const validatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await this.checkProductAvailability(item.productId, authToken);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        // Ensure sufficient stock
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Reduce stock in the product service
        await this.reduceStock(item.productId, item.quantity, authToken);

        // Calculate item total and add to order total
        totalPrice += product.price * item.quantity;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );

    // Save the order
    const order = new this.orderModel({
      items: validatedItems,
      totalPrice,
      status: 'Pending',
    });

    return order.save();
  }

  async getOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  private async checkProductAvailability(productId: string, authToken: string) {
    const productServiceUrl = `http://localhost:3005/products/${productId}`;
    const response = await fetch(productServiceUrl, {
      headers: {
        Authorization: authToken,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Product not found: ${productId}`);
    }

    return response.json();
  }

  private async reduceStock(productId: string, quantity: number, authToken: string) {
    const reduceStockUrl = `http://localhost:3005/products/${productId}/reduce-stock`;
    const response = await fetch(reduceStockUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({ quantity }),
    });

    console.log(response);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed to reduce stock');
    }
  }
}
