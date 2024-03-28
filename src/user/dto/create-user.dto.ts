import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
  @IsNumber()
  @ApiProperty()
  mobile: number;
}
