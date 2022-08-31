import { IAlertProps } from '../../types/alert';
import './alert.css';

export default function Alert({alertStatus, alertText}: IAlertProps) {
  return (
    <div className={`alert alert-wrapper alert-${alertStatus}`}>
      {alertText}
    </div>
  )
}
