import { createCost, setCosts, updateCost } from './../context/costs';
import { createCostFx, updateCostFx } from './../api/costsClient';
import { deleteCostFx, getCostFx, refreshTokenFx } from '../api/costsClient';
import { AxiosError } from './../../node_modules/axios/index.d';
import { IHandleAxiosErrPayload } from './../types/handleAxiosErrPayload.interface';
import { getAuthDataFromLS, handleAlertMsg, removeUser } from './auth';
import { ICost } from '../types/cost.interface';

export const handleAxiosError = async (
  error: unknown,
  payload?: IHandleAxiosErrPayload | null
) => {
  const errorMsg = 
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;
    
  if (errorMsg) {
    if (errorMsg === 'jwt expired') {
      const payloadData = payload as IHandleAxiosErrPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFx({
        url: '/auth/refresh-token',
        token: authData!.refreshToken,
        username: authData!.username
      })

      if(payload !== null) {
        switch (payloadData.type) {
          case 'get':
            const costs = await getCostFx({
              url: '/costs',
              token: authData!.accessToken
            })

            setCosts(costs);
            break;
          case 'create':
            const cost = await createCostFx({
              url: '/costs',
              token: authData!.accessToken,
              cost: { ...payloadData.createPost?.cost } as ICost
            });

            if(!cost) return;

            createCost(cost)
            break;
          case 'update':
            const updatedCost = await updateCostFx({
              url: '/costs',
              token: authData!.accessToken,
              cost: { ...payloadData.createPost?.cost } as ICost,
              id: payloadData.updateCost?.id as string,
            });

            if(!updatedCost) return;

            updateCost(updatedCost)
            break;
          case 'delete':
            await deleteCostFx({
              url: '/costs',
              token: authData!.accessToken,
              id: payloadData.deleteCost!.id as string
            })
            break;
          default:
            break;
        }
      }
    } else {
      handleAlertMsg({ alertText: errorMsg, alertStatus: 'warning' });
      removeUser();
    }
  } else {
    handleAlertMsg({ alertText: errorMsg, alertStatus: 'warning' });
  }
}