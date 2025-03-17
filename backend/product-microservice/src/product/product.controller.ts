/* eslint-disable prettier/prettier */
import { 
  Controller, Get, Post, Body, Param, Delete, UploadedFile, UseInterceptors, 
  Put, UseGuards, Patch 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/category/:categoryName')
  findAllByCategory(@Param('categoryName') categoryName: string) {
    return this.productService.findAllByCategory(categoryName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
     return this.productService.update(id, updateProductDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update-quantity')
  async updateProductQuantity(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    return this.productService.updateQuantity(id, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reduce-stock')
  async reduceStock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.productService.reduceStock(id, body.quantity);
  }

}
