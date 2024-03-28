import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PRODUCT_NAME } from '../schema';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';
import { CreateProduct } from '../dto/create-product';
import { UpdateProductDto } from '../dto/update-product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT_NAME) readonly productModel: Model<Product>,
  ) {}
  async createProduct(product: CreateProduct) {
    try {
      return this.productModel.create(product);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async getProduct(filter: UpdateProductDto = {}) {
    try {
      return this.productModel.find(filter).populate(["category"]).sort({createdAt:-1});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async updateProductById(product: UpdateProductDto, id: string) {
    try {
      return this.productModel.findByIdAndUpdate(id, product, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getItemById(id:string){
    return this.productModel.findById(id).populate(["category"] )
  }
  async deleteItemById(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
