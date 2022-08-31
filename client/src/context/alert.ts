import { createDomain } from 'effector';
import { IAlertProps } from '../types/alert';

const error = createDomain();

export const setAlert = error.createEvent<IAlertProps>()

export const $alert = error.createStore<IAlertProps>({ alertText: '', alertStatus: '' })
    .on(setAlert, (_, value) => value)