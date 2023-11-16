import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import {PasswordService} from './password.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({type: 'email-exists'});
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
    });

    return {accessToken};
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException({type: 'email-exists'});
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException({type: 'unauthorized'});
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {accessToken};
  }
}
