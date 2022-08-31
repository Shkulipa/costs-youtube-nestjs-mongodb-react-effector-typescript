import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerAuthorization = request.headers.authorization;

    const unauthorizedError = 'Error authorization';
    if (!headerAuthorization)
      throw new UnauthorizedException(unauthorizedError);

    const token = headerAuthorization.split(' ')[1];

    if (!token) throw new UnauthorizedException(unauthorizedError);

    const validToken = this.authService.verifyToken(token);

    if (validToken?.error) throw new UnauthorizedException(validToken.error);

    return (request.token = token);
  }
}
