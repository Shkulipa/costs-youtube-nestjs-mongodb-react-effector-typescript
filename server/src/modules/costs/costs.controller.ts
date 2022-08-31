import { CreateCostDto } from './dto/costsCreate.dto';
import { JwtGuard } from './../auth/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { OwnerCostGuard } from './guards/ownerCost.guard';
import { ValidIdGuard } from 'src/common/guards/validId.guards';

@Controller('costs')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getAllCosts(@Req() req, @Res() res: Response) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const costs = await this.costsService.findAll();
    const filteredCosts = costs.filter(
      (cost) => cost.userId === user._id.toString(),
    );

    return res.send(filteredCosts);
  }

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.costsService.create({
      ...createCostDto,
      userId: user._id as string,
    });
  }

  @Patch('/:id')
  @UseGuards(ValidIdGuard, JwtGuard, OwnerCostGuard)
  @HttpCode(HttpStatus.OK)
  async updateCost(
    @Body() updateCostDto: CreateCostDto,
    @Param('id') paramId: string,
  ) {
    return await this.costsService.update(updateCostDto, paramId);
  }

  @Delete('/:id')
  @UseGuards(ValidIdGuard, JwtGuard, OwnerCostGuard)
  @HttpCode(HttpStatus.OK)
  async deleteCost(@Param('id') paramId: string, @Res() res: Response) {
    await this.costsService.delete(paramId);
    return res.send(`Cost(${paramId}) was deleted`);
  }
}
