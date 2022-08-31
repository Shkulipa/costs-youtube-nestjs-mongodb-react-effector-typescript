import { createEffect } from 'effector';
import { IRefreshTokenDto } from '../dto/refreshToken.dto';
import { ICreateCost } from '../types/createCost.interface';
import { IDeleteCost } from '../types/deleteCost.interface';
import { IGetCost } from '../types/getCosts.interface';
import { IUpdateCost } from '../types/updateCost.interface';
import { handleAxiosError } from '../utils/errors';
import { api } from './axiosClient';

export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(url, { ...cost }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
     });

     return data;
  } catch(err) {
    console.error(err);
    handleAxiosError(err, { type: 'create', createPost: { cost } })
  }
})

export const updateCostFx = createEffect(async ({ url, cost, token, id }: IUpdateCost) => {
  try {
    const { data } = await api.post(`${url}/${id}`, { ...cost }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
     });

     return data;
  } catch(err) {
    console.error(err);
    handleAxiosError(err, { type: 'update', updateCost: { cost, id } })
  }
})

export const getCostFx = createEffect(async ({ url, token }: IGetCost) => {
  try {
    const { data } = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
     });
     return data;
  } catch(err) {
    console.error(err);
    handleAxiosError(err, { type: 'get' })
  }
})

export const deleteCostFx = createEffect(async ({ url, token, id }: IDeleteCost) => {
  try {
    await api.delete(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
     });
  } catch(err) {
    console.error(err);
    handleAxiosError(err, { type: 'delete', deleteCost: { id } })
  }
})

export const refreshTokenFx = createEffect(async ({ url, token, username }: IRefreshTokenDto) => {
  try {
    const res = await api.post(url, 
      {
        refreshToken: token,
        username
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if(res.status === 200) {
      localStorage.setItem('auth', JSON.stringify({
        ...res.data,
        username
      }))
    }

     return res.data.accessToken;
  } catch(err) {
    console.error(err);
  }
})