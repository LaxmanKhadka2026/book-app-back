import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ConfigService } from '@nestjs/config';
import { UpdateProductDto } from '../dto/update-product';
import { CreateProduct } from '../dto/create-product';
import { FileInterceptor } from '@nestjs/platform-express';
import { getFileConfig } from 'src/helper/upload';
import { Request, Response } from 'express';
import * as path from 'path';
import { JWTAuthGuard } from 'src/auth/JWTAuth.guard';

@Controller('product')
@ApiTags('product')
@UsePipes(ValidationPipe)
export class ProductController {
  constructor(
    private readonly _productService: ProductService,
    private readonly _config: ConfigService,
  ) {}


  @Get('/')
  @ApiOperation({ summary: 'get items ' })
  @ApiQuery({
    name: 'filter',
    type: Object,
    description: 'passs the query filtes',
  })
  @ApiSecurity('auth')
  async getItem(@Query() filter: UpdateProductDto) {
    console.log(filter)
    return await this._productService.getProduct(filter);
  }
  

  @Get('/single/:id')
  @ApiOperation({ summary: 'get items ' })
  @ApiSecurity('auth')
  async getItemById(@Param('id') id: string) {
    return await this._productService.getItemById(id);
  }



  @Delete(':id')
  @ApiOperation({ summary: 'delete product by id' })
  @ApiSecurity('auth')
  @UseGuards(JWTAuthGuard)
  async deleteProductId(@Param('id') id: string) {
    return this._productService.deleteItemById(id);
  }

  @UseInterceptors(FileInterceptor('image', getFileConfig()))
  @Post('/')
  @ApiOperation({ summary: 'create product by id' })
  @ApiSecurity('auth')
  @UseGuards(JWTAuthGuard)
  async createItem(@Body() item: CreateProduct, @Req() req) {
    if (!req.file) {
      throw new BadRequestException('file required');
    }
    return this._productService.createProduct({
      ...item,
      image: req.file.filename,
    });
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'update product by  id ',
  })
  @ApiSecurity('auth')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('image', getFileConfig()))
  async updateItem(
    @Body() item: UpdateProductDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    if (req.file) {
      item.image = req.file.filename;
    }
    return this._productService.updateProductById(
      {
        ...item
      },
      id,
    );
  }

  @Get('/getFile')
  @ApiOperation({ summary: 'get upload file' })
  @ApiQuery({
    name: 'fileName',
    description: 'name of the file which you want to get ',
  })
  getUploadFile(@Query('fileName') fileName: string, @Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../../upload', fileName));
  }
}
