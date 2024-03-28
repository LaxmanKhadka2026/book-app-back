import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CATEGORY_MODEL, CategorySchema } from 'src/category';
import { PRODUCT_NAME, ProductSchema } from 'src/product/schema';
import { USER_MODEL, UserSchema } from 'src/user/schema/user.schema';

const DB_MODEL = [
  {
    name: USER_MODEL,
    schema: UserSchema,
  },
  {
    name: PRODUCT_NAME,
    schema: ProductSchema,
  },
  {
    name: CATEGORY_MODEL,
    schema: CategorySchema,
  },
];
@Global()
@Module({
  imports: [MongooseModule.forFeature(DB_MODEL)],
  exports: [MongooseModule],
})
export class DatabaseModelModule {}
