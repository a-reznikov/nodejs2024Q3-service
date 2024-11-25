import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findByLogin(login);

    console.log(user);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.login };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(login: string, password: string) {
    await this.userService.create({ login, password });

    return 'Successful signup';
  }
}
