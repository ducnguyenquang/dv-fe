import { DecodedToken } from '../app/containers/Authentication/types';
import jwtDecode from 'jwt-decode';

export const checkToken = (): boolean => {
  try {
    const token = localStorage.getItem('Token');

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);

      if (decodedToken.exp > Date.now() / 1000) {
        return true;
      }
      localStorage.removeItem('Token');
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getUserFromAsyncStorage = () => {
  return JSON.parse(localStorage.getItem('userProfile') || '{}');
};

export const checkSession = (statusCode: Number) => {
  if (statusCode === 401) {
    localStorage.removeItem('Token');
    localStorage.removeItem('userProfile');
    window.location.reload();
  }
};
