import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { validId } from 'src/common/utils/validId';

@Injectable()
export class ValidIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    const isValidId = validId(id);
    if (!isValidId) throw new BadRequestException(`Id(${id}) isn't valid`);

    return true;
  }
}
