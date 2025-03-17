/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.model';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Synchronize inventory with products at startup
  @Post('synchronize')
  async synchronizeWithProducts() {
    await this.inventoryService.synchronizeWithProducts();
    return { message: 'Inventory synchronized with products successfully' };
  }

  // Get all products with their stock levels
  @Get()
  async getAllStocks() {
    return await this.inventoryService.getAllStocks();
  }

  // Add stock to a specific product
  @Patch(':productId/add-stock')
  async addStock(
    @Param('productId') productId: string,
    @Body('amount') amount: number,
  ): Promise<Inventory> {
    return await this.inventoryService.addStock(productId, amount);
  }

  // Reduce stock when an order is placed
  @Patch(':productId/reduce-stock')
  async reduceStock(
    @Param('productId') productId: string,
    @Body('amount') amount: number,
  ): Promise<Inventory> {
    return await this.inventoryService.reduceStock(productId, amount);
  }

  // Create a new inventory record when a new product is added
  @Post()
  async createInventory(@Body() body: { productId: string; name: string }) {
    return await this.inventoryService.createNewInventory(body.productId, body.name);
  }
}
