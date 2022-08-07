import jwtDecode, { JwtPayload } from 'jwt-decode';

import type { CookiesResponse } from 'utils/storage';
import { MIN_REFRESH_TIME_BEFORE_EXPIRE } from 'constants/api';

export const isTokenValid = (token?: CookiesResponse): boolean => {
  try {
    if (!token) return false;

    const decodedToken = jwtDecode<JwtPayload>(token);
    const now = Date.now().valueOf() / 1000;

    return typeof decodedToken?.exp !== 'undefined' && decodedToken?.exp > now;
  } catch (e) {
    return false;
  }
};

export const getTokenRefreshTimeout = (token?: CookiesResponse): number => {
  try {
    if (!token) return 0;

    const decodedToken = jwtDecode<JwtPayload>(token);
    const now = Date.now().valueOf() / 1000;

    const timeToExpire = decodedToken.exp ? decodedToken.exp - now : 0;

    const timeoutTimeInSec =
      timeToExpire > MIN_REFRESH_TIME_BEFORE_EXPIRE ? timeToExpire - MIN_REFRESH_TIME_BEFORE_EXPIRE : 0;

    return Math.floor(timeoutTimeInSec * 1000);
  } catch (e) {
    return 0;
  }
};
