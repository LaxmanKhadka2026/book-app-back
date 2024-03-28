import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct } from './create-product';
export class UpdateProductDto extends PartialType(CreateProduct) {}
