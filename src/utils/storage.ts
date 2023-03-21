/* eslint-disable import/no-anonymous-default-export */
import Cookies from 'js-cookie';

export type CookiesResponse = string | undefined | void;

export const STORAGE_COOKIE_KEYS = {
  AUTH_TOKEN: 'dv-auth-token',
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
  SHOPPING_CART: 'shopping-cart',
  LANGUAGE: 'language',
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

  setAccessToken: (accessToken: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.ACCESS_TOKEN, accessToken, { expires: 365 });
  },
  getAccessToken: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.ACCESS_TOKEN),

  setShoppingCart: (item: string): CookiesResponse => {
    Cookies.set(STORAGE_COOKIE_KEYS.SHOPPING_CART, item, { expires: 365 });
  },
  getShoppingCart: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.SHOPPING_CART),

  // setLocationColumns: (location: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.LOCATION_COLUMN_ORDER, location, { expires: 365 });
  // },
  // getLocationColumns: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.LOCATION_COLUMN_ORDER),
  // setCustomerColumns: (location: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.CUSTOMER_COLUMN_ORDER, location, { expires: 365 });
  // },
  // getCustomerColumns: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CUSTOMER_COLUMN_ORDER),
  // setEmployeeColumns: (location: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.EMPLOYEE_COLUMN_ORDER, location, { expires: 365 });
  // },
  // getEmployeeColumns: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.EMPLOYEE_COLUMN_ORDER),
  // setCalendarLocation: (location: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.CALENDAR_LOCATION, location, { expires: 365 });
  // },
  // getCalendarLocation: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CALENDAR_LOCATION),
  // setCalendarView: (location: string): CookiesResponse => {
  //   Cookies.set(STORAGE_COOKIE_KEYS.CALENDAR_VIEW, location, { expires: 365 });
  // },
  // getCalendarView: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.CALENDAR_VIEW),
  setLanguage: (language: string): CookiesResponse =>
    Cookies.set(STORAGE_COOKIE_KEYS.LANGUAGE, language, { expires: 365 }),
  getLanguage: (): CookiesResponse => Cookies.get(STORAGE_COOKIE_KEYS.LANGUAGE),
  clear: (): CookiesResponse => {
    Cookies.remove(STORAGE_COOKIE_KEYS.REFRESH_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.AUTH_TOKEN);
    // Cookies.remove(STORAGE_COOKIE_KEYS.EQUIPMENT_FILTERS);
    // Cookies.remove(STORAGE_COOKIE_KEYS.CALENDAR_LOCATION);
    // Cookies.remove(STORAGE_COOKIE_KEYS.CALENDAR_VIEW);
    // Cookies.remove(STORAGE_COOKIE_KEYS.LOCATION_COLUMN_ORDER);
    // Cookies.remove(STORAGE_COOKIE_KEYS.CUSTOMER_COLUMN_ORDER);
    // Cookies.remove(STORAGE_COOKIE_KEYS.EMPLOYEE_COLUMN_ORDER);
    Cookies.remove(STORAGE_COOKIE_KEYS.ACCESS_TOKEN);
    Cookies.remove(STORAGE_COOKIE_KEYS.LANGUAGE);

  },
};
