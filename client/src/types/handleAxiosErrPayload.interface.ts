import { IBaseEffectArgs } from './baseEffectArgs.interface';
import { ICreateCost } from './createCost.interface';
import { IDeleteCost } from './deleteCost.interface';
import { IUpdateCost } from './updateCost.interface';

/**
 * Partial<T> - это тип сопоставления который помечает 
 * все члены, как необязательные ( :? ).
 */
export interface IHandleAxiosErrPayload {
  type: string;
  createPost?: Partial<ICreateCost>;
  getPost?: Partial<IBaseEffectArgs>;
  deleteCost?: Partial<IDeleteCost>;
  updateCost?: Partial<IUpdateCost>;
}