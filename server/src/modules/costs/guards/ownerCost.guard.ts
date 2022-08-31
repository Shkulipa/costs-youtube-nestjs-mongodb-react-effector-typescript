import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { CostsService } from '../costs.service';

@Injectable()
export class OwnerCostGuard implements CanActivate {
  constructor(
    private readonly costService: CostsService,
    private readonly authService: AuthService,
  ) {}

  // for rules: https://docs.nestjs.com/guards

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // токен не есть доступен с предыдущего Guard, надо сделать тогда через middleware
    const headerAuthorization = request.headers.authorization;
    const token = headerAuthorization.split(' ')[1];

    const { id } = request.params;

    const cost = await this.costService.findOne(id);
    const user = this.authService.parseJwt(token);

    if (cost.userId !== user.user._id)
      throw new ForbiddenException(`You are not owner!`);

    return true;
  }
}
