import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JWTAuthGuard } from 'src/auth/JWTAuth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from '../dto/update-user.dto';
@Controller('user')
@ApiTags('User')
@UsePipes(new ValidationPipe({ transform: true }))
@ApiSecurity('auth')
// @UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly _usrService: UserService) {}


  @Post('/')
  @ApiOperation({ summary: 'create a new user' })
  // @UseGuards(AuthGuard)
  async create(@Body() user: CreateUserDto) {
    return await this._usrService.createUser(user);
  }

  @Get('/')
  @ApiOperation({ summary: 'get all user' })
  async getAllUser() {
    try {
      return this._usrService.getUsers();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get user by id' })
  async getUserById(@Param('id') id: string) {
    try {
      return this._usrService.getUsersById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  
  @ApiOperation({ summary: ' delete  user by id ' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') userId: string) {
    return this._usrService.deleteUserById(userId);
  }


  @ApiOperation({ summary: 'update user by id ' })
  @Patch(':id')
  async updateUserById(@Param('id') id: string, @Body() usr: UpdateUserDTO) {
    return this._usrService.updateUserById(usr, id);
  }
}
