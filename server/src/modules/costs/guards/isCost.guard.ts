import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CostsService } from '../costs.service';

@Injectable()
export class isCostGuard implements CanActivate {
  constructor(private costService: CostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    const cost = await this.costService.findOne(id);
    if (!cost)
      throw new BadRequestException(`Cost with id(${id}) wasn't found`);

    return true;
  }
}
