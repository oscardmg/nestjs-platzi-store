import { ProductsService } from '../../services/products/products.service';
import { ParseIntTestPipe } from '../../common/pipes/parse-int.pipe';
import { CreateProductDTO, UpdateProductDTO } from '../../dtos/products.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/filter/')
  filter(): string {
    return `filter`;
  }

  @Get()
  getAll(@Query('limit') limit = 20, @Query('offset') offset = 0): any {
    return this.productService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntTestPipe) productId: number): any {
    const product = this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product with id:${productId} not found`);
    }
    return product;
  }

  @Post()
  create(@Body() payLoad: CreateProductDTO): any {
    console.log(payLoad);
    return this.productService.create(payLoad);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) id: number,
    @Body() payLoad: UpdateProductDTO,
  ) {
    const updateProduct = this.productService.update(id, payLoad);
    if (!updateProduct) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return updateProduct;
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) id: number) {
    if (!this.productService.delete(id)) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
  }
}
