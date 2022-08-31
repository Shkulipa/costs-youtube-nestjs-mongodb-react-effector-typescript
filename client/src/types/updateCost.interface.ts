import { IBaseEffectArgs } from "./baseEffectArgs.interface";
import { ICost } from "./cost.interface";

export interface IUpdateCost extends IBaseEffectArgs {
  cost: ICost;
  id: string | number;
}