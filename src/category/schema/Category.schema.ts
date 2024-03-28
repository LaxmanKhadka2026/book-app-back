import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
export class Category extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;
}
export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
export const CATEGORY_MODEL = Category.name;
