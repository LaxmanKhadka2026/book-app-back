import { PickType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class Payload extends PickType(CreateUserDto, ['email']) {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
