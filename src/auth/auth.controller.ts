import { Body,Controller,Post,UsePipes,ValidationPipe,} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto) {
    return await this._authService.login(body);
  }
}
