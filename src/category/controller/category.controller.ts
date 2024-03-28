import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/JWTAuth.guard';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
@ApiTags('category')
@UsePipes(ValidationPipe)
@UseGuards(JWTAuthGuard)
@ApiSecurity('auth')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}
  @Get('/')
  @ApiOperation({
    summary: 'get all category ',
  })
  async getCategory() {
    return this._categoryService.getCategory();
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'delete category by id',
  })
  @UseGuards(AuthGuard)
  async deleteCategory(@Param('id') id: string) {
    return this._categoryService.deleteCategoryById(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'update category by id ' })
  async updateCategoryById(
    @Param('id') id: string,
    @Body() category: CreateCategoryDto,
  ) {
    return this._categoryService.updateCategoryById(category, id);
  }
  @Post('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'create category ' })
  async createCategory(@Body() category: CreateCategoryDto) {
    return this._categoryService.createCategory(category);
  }
}
