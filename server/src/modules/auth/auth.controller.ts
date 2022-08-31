import { CreateUserDto } from './dto/createUser.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/loginUser.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto copy';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LoginGuard)
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user._id as string,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh, username: user.username });
  }

  @Post('/registration')
  @UseGuards(RegistrationGuard)
  @UsePipes(new ValidationPipe())
  async registrationUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.usersService.registration(createUserDto);

    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }

  @Post('/refresh-token')
  @UseGuards(JwtRefreshGuard)
  @UsePipes(new ValidationPipe())
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = this.authService.verifyToken(
      refreshTokenDto.refreshToken,
    );
    const user = await this.usersService.findOne(refreshTokenDto.username);
    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      return res.send({ error: validToken?.error });
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...access,
        refreshToken: refreshTokenDto.refreshToken,
      });
    }
  }
}
