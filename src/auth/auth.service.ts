import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateTokens = async (payload: TokenPayload) => ({
    accessToken: await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    }),
    refreshToken: await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    }),
  });

  async signIn(login: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.findByLogin(login);

    if (user?.password !== password) {
      throw new ForbiddenException('Password is wrong');
    }

    const payload = { userId: user.id, login: user.login };

    return await this.generateTokens(payload);
  }

  async signUp(login: string, password: string) {
    return await this.userService.create({ login, password });
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException('RefreshToken has been missed');
    }

    try {
      const verified: TokenPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      console.log(verified);

      const user = await this.userService.findOne(verified.userId);

      const payload = { userId: user.id, login: user.login };

      return this.generateTokens(payload);
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
