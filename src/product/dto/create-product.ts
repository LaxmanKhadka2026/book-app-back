import {
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProduct {

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNumberString()
  price: number;
  @ApiProperty()
  @IsString()
  publication: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  category: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsOptional()
  @ApiProperty()
  image: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  author: string;

}
