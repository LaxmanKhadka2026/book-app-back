import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './dto/payload.dto';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly _authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate({ id }: Payload) {
    try {
      const usr = await this._authService.validUser(id);
      console.log(usr);
      if (!usr) {
        throw new UnauthorizedException();
      }
      return {
        id: usr._id,
        email: usr.email
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
