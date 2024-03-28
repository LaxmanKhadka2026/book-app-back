import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CATEGORY_MODEL, Category } from 'src/category/schema/Category.schema';
import { mapToId } from 'src/helper';


@Schema({
  timestamps: true,
  toJSON: {
    transform: mapToId,
  },
  toObject: {
    transform: mapToId,
  },
})
export class Product {
  @Prop({
    required: true,
  })
  title: string;
  @Prop({
    required: true,
    min: 0,
  })
  price: number;
  @Prop({
    type:Types.ObjectId,
    ref:()=> CATEGORY_MODEL,
    required: true,
    autoPopulate:true
  })
  category: Category;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    default: false,
  })
  isArchive: boolean;

  @Prop({})
  image: string;

  @Prop({})
  author:string;

  @Prop({})
  publication:string;

}

export const PRODUCT_NAME = Product.name;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(require('mongoose-autopopulate'))
