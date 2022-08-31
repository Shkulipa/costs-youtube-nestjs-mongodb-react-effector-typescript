import { createDomain } from 'effector';

/**
 * as a folder for logic that is only for this context store
 * 
 * more exmpls: https://effector.dev/ru/docs/recipes/react/counter
 */
const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();
export const setUsername = auth.createEvent<string>();

export const $auth = auth.createStore<boolean>(false)
  .on(setAuth, (prevState, newValue) => newValue);

  export const $username = auth.createStore<string>('')
  .on(setUsername, (prevState, newValue) => newValue);