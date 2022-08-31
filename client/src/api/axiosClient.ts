import axios from 'axios';

/**
 * if you are using refreh and access token, you can use
 * for refresh refrestToken
 * https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token
 * 
 * but in this project we are using handleAxiosError() in utils/error.ts
 */

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});