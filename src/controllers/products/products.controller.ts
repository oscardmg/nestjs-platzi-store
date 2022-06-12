import { ProductsService } from '../../services/products/products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  filter(): string {
    return `filter`;
  }

  @Get()
  getAll(@Query('limit') limit = 20, @Query('offset') offset = 0): any {
    return this.productService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number): any {
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payLoad: any): any {
    return this.productService.create(payLoad);
  }

  @Put(':productId')
  update(@Param('productId', ParseIntPipe) id: number, @Body() payLoad: any) {
    const updateProduct = this.productService.update(id, payLoad);
    if (updateProduct === null) {
      return {
        message: 'Product not found',
      };
    }
    return updateProduct;
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) id: number) {
    try {
      this.productService.delete(id);
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
