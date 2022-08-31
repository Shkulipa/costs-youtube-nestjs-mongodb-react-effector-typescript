import { IBaseEffectArgs } from "./baseEffectArgs.interface";
import { ICost } from "./cost.interface";

export interface ICreateCost extends IBaseEffectArgs {
  cost: ICost;
}