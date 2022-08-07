/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// import { loadProgressBar } from 'axios-progress-bar';

import storage from './storage';
import { isTokenValid } from './token';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  headers: {
    'Content-type': 'application/json',
  },
});

// loadProgressBar(null, api);

const enhancedApi = {
  ...api,
  setAuthToken(token: string): void {
    // this.defaults.headers.Authorization = `Bearer ${token}`;
  },
  CancelToken: axios.CancelToken,
  isCancel: axios.isCancel,
};
const authToken = storage.getAuthToken();

if (isTokenValid(authToken)) {
  enhancedApi.setAuthToken(authToken as string);
}

export default enhancedApi;
