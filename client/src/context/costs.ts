import { createDomain } from 'effector';
import { ICost } from '../types/cost.interface';

const costs = createDomain();

export const setTotalCosts = costs.createEvent<number>();
export const setCosts = costs.createEvent<ICost[]>();
export const createCost = costs.createEvent<ICost>();
export const updateCost = costs.createEvent<ICost>();
export const removeCost = costs.createEvent<string | number>();

const handleRemoveCost = (costs: ICost[], id: string | number) => 
  costs.filter(cost => cost._id !== id);

const handleUpdateCost = (costs: ICost[], id: string | number, payload: Partial<ICost>) =>
 costs.map(cost => {
  if(cost._id === id) {
    return {
      ...cost,
      ...payload
    }
  }

  return cost;
 })

export const $costs = costs.createStore<ICost[]>([])
  .on(setCosts, (prevState, costs) => costs)
  .on(createCost, (state, cost) => [...state, cost])
  .on(updateCost, (state, newCost) => 
    state.map(cost => cost._id === newCost._id ? newCost : cost))
  .on(removeCost, (state, costId) => [...handleRemoveCost(state, costId)])
  .on(updateCost, (state, cost) => 
  [...handleUpdateCost(state, cost._id as string, { text: cost.text, date: cost.date, price: cost.price })]
  )

export const $totalPrice = costs.createStore<number>(0)
    .on(setTotalCosts, (_, newValue) => newValue)