import { UpdateCostDto } from './dto/costsUpdate.dto';
import { CreateCostDto } from './dto/costsCreate.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cost, CostsDocument } from './costs.schema';

@Injectable()
export class CostsService {
  constructor(
    @InjectModel(Cost.name) private readonly costsModel: Model<CostsDocument>,
  ) {}

  async findAll(): Promise<Cost[]> {
    return this.costsModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costsModel.findOne({ _id: id });
  }

  async create(createCostDto: CreateCostDto): Promise<Cost> {
    const createCost = new this.costsModel(createCostDto);
    return await createCost.save();
  }

  async update(updateCostDto: UpdateCostDto, id: string): Promise<Cost> {
    await this.costsModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateCostDto,
        },
      },
    );
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.costsModel.findByIdAndDelete(id);
  }
}
