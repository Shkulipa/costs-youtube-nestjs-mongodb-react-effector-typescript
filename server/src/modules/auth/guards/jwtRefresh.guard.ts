import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken, username } = request.body;

    if (!refreshToken)
      throw new UnauthorizedException('Field refreshToken is required');

    if (!username)
      throw new UnauthorizedException('Field username is required');

    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException("User isn't exsist");

    return true;
  }
}
