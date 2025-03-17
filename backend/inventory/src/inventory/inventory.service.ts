/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Inventory } from './inventory.model';
import fetch from 'node-fetch';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('InventoryModel') private readonly inventoryModel: Model<Inventory>,
  ) {}

  async synchronizeWithProducts() {
    const productServiceUrl = `http://localhost:3005/products`; // Corrected URL
    try {
      const response = await fetch(productServiceUrl);
      const products = await response.json();
  
      if (!Array.isArray(products)) {
        console.error('Invalid response from product service:', products);
        throw new Error('Expected an array of products');
      }
  
      for (const product of products) {
        const existingInventory = await this.inventoryModel.findOne({ _id: product._id }).exec();
        if (!existingInventory) {
          const newInventory = new this.inventoryModel({
            _id: product._id,
            name: product.name,
            quantity: 0,
            restockthresh: 10,
          });
          await newInventory.save();
        }
      }
      console.log('Inventory successfully synchronized with products');
    } catch (error) {
      console.error('Error synchronizing with products:', error.message);
      throw error;
    }
  }
  // Get all products with their stock levels
  async getAllStocks(): Promise<{ productName: string; quantity: number }[]> {
    const inventory = await this.inventoryModel.find().exec();
    return inventory.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
    }));
  }

  // Add stock to a product
  async addStock(productId: string, amount: number): Promise<Inventory> {
    const inventory = await this.inventoryModel.findOne({ _id: productId }).exec();
    if (!inventory) {
      throw new Error('Product not found in inventory');
    }

    inventory.quantity += amount;
    inventory.lastupdated = new Date();
    return inventory.save();
  }

  // Decrease stock when an order is placed
  async reduceStock(productId: string, amount: number): Promise<Inventory> {
    const inventory = await this.inventoryModel.findOne({ _id: productId }).exec();
    if (!inventory) {
      throw new Error('Product not found in inventory');
    }

    if (inventory.quantity < amount) {
      throw new Error('Not enough stock available');
    }

    inventory.quantity -= amount;
    inventory.lastupdated = new Date();

    if (inventory.quantity < inventory.restockthresh) {
      this.notifyLowStock(productId, inventory.quantity);
    }

    return inventory.save();
  }

  // Create a new inventory record when a new product is added
  async createNewInventory(productId: string, name: string): Promise<Inventory> {
    const newInventory = new this.inventoryModel({
      _id: productId,
      name,
      quantity: 0, // Default stock
      restockthresh: 10, // Default threshold
    });
    return newInventory.save();
  }

  // Notify admin when stock is low
  private notifyLowStock(productId: string, quantity: number): void {
    console.log(`Admin Notification: Product ${productId} is low on stock. Only ${quantity} remaining.`);
  }
}
