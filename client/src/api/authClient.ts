import { handleAxiosError } from './../utils/errors';
import { AxiosResponse } from './../../node_modules/axios/index.d';
import { setAuth, setUsername } from "../context/auth";
import { api } from "./axiosClient";
import { IAuthResDto } from '../dto/authRes.dto';


interface IAuthDto {
  username: string;
  password: string;
}

export class AuthClinet {
  static async login(username: string, password: string) {
    try {
      const res = await api.post<IAuthDto, AxiosResponse<IAuthResDto>>('/auth/login', { username, password });

      if(res.status === 200) {
        setAuth(true);
        setUsername(res.data.username);
        localStorage.setItem('auth', JSON.stringify(res.data));
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      handleAxiosError(err);
    }
  }

  static async registration(username: string, password: string) {
    try {
      const res = await api.post<IAuthDto, AxiosResponse<IAuthResDto>>('/auth/registration', { username, password });

      if(res.status === 200) {
        setAuth(false);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      handleAxiosError(err);
    }
  }
}