import { ICost } from "../../../types/cost.interface"
import { CostItem } from "../costItem/costItem"

interface ICostsList {
  costs: ICost[]
}

export function CostsList({ costs }: ICostsList) {
  return (
    <ul>
      {costs.map((cost, idx) => <CostItem key={cost._id} cost={cost} index={idx + 1} />)}
    </ul>
  )
}
