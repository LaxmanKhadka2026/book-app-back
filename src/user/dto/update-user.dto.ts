import { PartialType,OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDto,['password'])) {
    @IsOptional()
    @IsString()
    password:string
}
