import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dto/login.dto';
import { isEmpty, pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usrService: UserService,
    private readonly _jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    try {
      const usr = await this.usrService.getUsersByEmail(email);
      if (isEmpty(usr.toObject())) throw new UnauthorizedException();

      if (!(await usr.isValidPassword(password))) throw new UnauthorizedException();
      const payloadUsr = pick(usr.toObject(), ['email', 'role', 'id']);
      return {
        token: this._jwtService.sign(payloadUsr),
        user: usr,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async validUser(id: string) {
    try {
      const user = (await this.usrService.getUsersById(id)).toObject();
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {}
  }
}
