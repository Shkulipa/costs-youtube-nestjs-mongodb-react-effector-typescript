import { CreateUserDto } from './../auth/dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    return user;
  }

  async generateAccessToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        { user },
        {
          secret: jwtConstants.accessSecret,
        },
      ),
    };
  }

  async generateRefreshToken(userId: string) {
    return {
      refreshToken: this.jwtService.sign(
        { userId },
        {
          secret: jwtConstants.accessSecret,
          expiresIn: '30d',
        },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return { error: err.message };
    }
  }

  parseJwt(token: string) {
    //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  async getUserByTokenData(token: string): Promise<User> {
    const parsedTokenData = this.parseJwt(token);
    return await this.usersService.findOne(parsedTokenData.user.username);
  }
}
