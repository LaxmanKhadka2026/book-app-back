import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CATEGORY_MODEL, CategoryDocument } from '../schema/Category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '../controller/dto/create.category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CATEGORY_MODEL)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async getCategory() {
    try {
      const category = await this.categoryModel.find();
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async deleteCategoryById(id: string) {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id);
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async createCategory(category: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryModel.create(category);
      return newCategory;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Duplicate key error: The category name already exists.',
        );
      } else
        throw new InternalServerErrorException(
          error?.message ?? 'internal server error',
        );
    }
  }

  async updateCategoryById(category: CreateCategoryDto, id: string) {
    try {
      const newCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        category,
      );
      return newCategory;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Duplicate key error: The category name already exists.',
        );
      } else
        throw new InternalServerErrorException(
          error?.message ?? 'internal server error',
        );
    }
  }
}
