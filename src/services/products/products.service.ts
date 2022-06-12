import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 0,
      image: 'image1.jpg',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  create(product: CreateProductDTO): Product {
    this.counterId++;
    const newProduct: Product = {
      id: this.counterId,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, productUpdate: UpdateProductDTO): Product {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((p) => p.id === id);

      this.products[index] = {
        ...product,
        ...productUpdate,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const existingProduct = this.products.find((product) => product.id === id);
    if (!existingProduct) {
      return false;
    }
    this.products = this.products.filter((product) => product.id !== id);
    return true;
  }
}
