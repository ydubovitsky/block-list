import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PasswordService} from './password.service';
import {CookieService} from './cookie.service';
import {UsersModule} from 'src/users/users.module';
import {AuthController} from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_KEY,
    signOptions: {expiresIn: "1d"}
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService],
})
export class AuthModule {}
