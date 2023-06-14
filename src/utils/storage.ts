/* eslint-disable import/no-anonymous-default-export */
import Cookies from 'js-cookie';

export type CookiesResponse = string | undefined | void;

export const STORAGE_COOKIE_KEYS = {
  AUTH_TOKEN: 'dv-auth-token',
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
  SHOPPING_CART: 'shopping-cart',
  LANGUAGE: 'language',
  CURRENT_USER: 'current-user',
  AVATAR_USER: 'avatar-user',
  CLIENT_CURRENT_USER: 'client-current-user',
  CLIENT_ACCESS_TOKEN: 'client-access-token',
};

export default {
  setRefreshToken: (refreshToken: string): CookiesResponse =>
    Cookies.set(STORAGE_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, { expires: 365 }),
  getRefreshToken: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.REFRESH_TOKEN),
  setAuthToken: (authToken: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.AUTH_TOKEN, authToken, { expires: 365 });
  },
  getAuthToken: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.AUTH_TOKEN),
  // setEquipmentFilters: (filters: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.EQUIPMENT_FILTERS, filters, { expires: 365 });
  // },
  // getEquipmentFilters: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.EQUIPMENT_FILTERS),

  setClientAccessToken: (accessToken: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.CLIENT_ACCESS_TOKEN, accessToken, { expires: 365 });
  },
  getClientAccessToken: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CLIENT_ACCESS_TOKEN),

  setClientCurrentUser: (currentUser: string): CookiesResponse =>
    Cookies.set(STORAGE_COOKIE_KEYS.CLIENT_CURRENT_USER, currentUser, { expires: 365 }),
  getClientCurrentUser: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CLIENT_CURRENT_USER),

  setAccessToken: (accessToken: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.ACCESS_TOKEN, accessToken, { expires: 365 });
  },
  getAccessToken: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.ACCESS_TOKEN),

  setCurrentUser: (currentUser: string): CookiesResponse =>
    Cookies.set(STORAGE_COOKIE_KEYS.CURRENT_USER, currentUser, { expires: 365 }),
  getCurrentUser: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CURRENT_USER),
  setAvatarUser: (avatarUser: string): CookiesResponse =>
    sessionStorage.setItem(STORAGE_COOKIE_KEYS.AVATAR_USER, avatarUser),
    // Cookies.set(STORAGE_COOKIE_KEYS.AVATAR_USER, avatarUser, { expires: 365 }),
  getAvatarUser: (): any => sessionStorage.getItem(STORAGE_COOKIE_KEYS.AVATAR_USER),

  setShoppingCart: (item: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.SHOPPING_CART, item, { expires: 365 });
  },
  getShoppingCart: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.SHOPPING_CART),

  setLanguage: (language: string): CookiesResponse =>
    Cookies.set(STORAGE_COOKIE_KEYS.LANGUAGE, language, { expires: 365 }),
  getLanguage: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.LANGUAGE),
  clear: (): CookiesResponse => {
    Cookies.remove(STORAGE_COOKIE_KEYS.REFRESH_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.AUTH_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.LANGUAGE);

    Cookies.remove(STORAGE_COOKIE_KEYS.ACCESS_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.CURRENT_USER);
    Cookies.remove(STORAGE_COOKIE_KEYS.CLIENT_ACCESS_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.CLIENT_CURRENT_USER);
    // Cookies.remove(STORAGE_COOKIE_KEYS.AVATAR_USER);
    sessionStorage.clear();
  },
};
