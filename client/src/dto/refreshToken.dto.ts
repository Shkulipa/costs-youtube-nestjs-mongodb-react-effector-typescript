import { IBaseEffectArgs } from "../types/baseEffectArgs.interface";

export interface IRefreshTokenDto extends IBaseEffectArgs {
  username: string;
}