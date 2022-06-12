import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategories(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `Category ${id} productId ${productId}`;
  }
}
