import { setTotalCosts } from "../context/costs";
import { ICost } from "../types/cost.interface";

export const countTotalPrice = (costs: ICost[]) => {
  if(!costs) return;
  setTotalCosts(
    costs.reduce((countState, item) => countState + item.price, 0)
  )
}

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  return newDate.toLocaleString('ru', options as Intl.DateTimeFormatOptions);
}