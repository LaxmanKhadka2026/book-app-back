import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JWTStrategy } from './jwt.stargety';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: { expiresIn: '55d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
