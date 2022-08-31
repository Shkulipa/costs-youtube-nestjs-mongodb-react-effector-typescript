import { setCosts } from './../context/costs';
import { setUsername } from './../context/auth';
import { setAlert } from "../context/alert";
import { setAuth } from "../context/auth";
import { IAlertProps } from "../types/alert";
import { IAuthResDto } from '../dto/authRes.dto';

export const removeUser = () => {
  localStorage.removeItem('auth');
  setAuth(false);
  setUsername('');
  setCosts([]);
}

export const getAuthDataFromLS = () => {
  try {
    const auth = localStorage.getItem('auth') as string;
    const lsData = JSON.parse(auth) as IAuthResDto;

    if(!lsData) {
      removeUser();
      return;
    };

    return lsData;
  } catch (err) {
    console.error(err);
    removeUser();
  }
}

export const handleAlertMsg = (alert: IAlertProps) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertStatus: '', alertText: '' }), 5e3);
}