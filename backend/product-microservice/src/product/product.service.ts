/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const newProduct = new this.productModel({
      ...createProductDto,
      image: file?.buffer,
    });
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findAllByCategory(category: string): Promise<any[]> {
    const products = await this.productModel.find({ category }).exec();
      return products.map(product => ({
      ...product.toObject(),
      image: product.image ? product.image.toString('base64') : null,
    }));
  }

  async findOne(id: string): Promise<any> {
    try {
      const product = await this.productModel.findById(new Types.ObjectId(id)).exec();
  
      if (product) {
        return {
          ...product.toObject(),
          image: product.image ? product.image.toString('base64') : null,
        };
      }
      return null;
    } catch (error) {
      console.error('Error finding product:', error);
      throw new Error('Invalid product ID or product not found.');
    }
  }

  async update(id: string, updateProductDto: any, file: Express.Multer.File): Promise<Product> {
    const updateData = {
      ...updateProductDto,
      ...(file ? { image: file.buffer } : {}),
    };
    return this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async reduceStock(productId: string, quantity: number): Promise<Product> {
    // Fetch the product directly from the database
    const product = await this.productModel.findById(productId).exec();
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    if (product.quantity < quantity) {
      throw new Error('Insufficient stock');
    }
  
    // Deduct the quantity
    product.quantity -= quantity;
  
    // Save the updated product
    return product.save(); // Ensure this is a Mongoose document
  }
  
  

  async updateQuantity(productId: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.quantity = quantity;
    return product.save();
  }
}
