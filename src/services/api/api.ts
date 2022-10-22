import axios, { AxiosResponse } from 'axios';
// import AppConfig from 'config/';
import { checkSession } from 'utils/auth';
import endPoint from './endPoint.json';

/**
 * Get Root Link from env config
 * @param {string} apiType
 * @param{boolean} isAuthorized
 * @returns {string}
 */

// const getRootLink = () => {
//   return AppConfig.getApiEndpoint();
// };
/**
 * Get Full API Link
 * @param options
 * @returns {string}
 */

const getFullAPILink = (link: string, options = {}) => {
  return endPoint.backendUrl + link;
};

/**
 * Success response interceptor
 * @param response
 * @returns {any}
 */
const handleSuccess = (response: any) => {
  return response;
};

/**
 * Error response interceptor
 * @param error;
 * @returns {Promise}
 */
const handleError = (error: { response: { status: Number; }; }) => {
  let message = '';

  if (error && error.response) {
    checkSession(error.response.status);
  }
  return Promise.reject(message || error);
};

const service = axios.create();
service.interceptors.response.use(handleSuccess, handleError);

const getRequestHeaders = async () => {
  const headers: any = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
  headers['Access-Control-Max-Age'] = 86400;
  // headers['Access-Control-Allow-Headers'] = 'X-PINGOTHER, Content-Type';
  headers['Content-type'] = 'application/json; charset=UTF-8';
  // headers['Content-type'] = 'application/x-www-form-urlencoded';
  headers['Cache-control'] =
    'no-cache,no-store,must-revalidate,max-age=-1,private';
  // headers['Authorization'] = `Bearer ${localStorage.getItem('Token') || ''}`;
  headers['x-access-token'] = `${localStorage.getItem('Token') || ''}`;

  // headers['lang'] = localStorage.getItem('i18nextLng') || 'en';

  return headers;
};

/**
 * Handle Response
 * @param data
 * @returns {Promise}
 */

const handleResponseData = (data: AxiosResponse<any, any>) => {
  console.log('==== handleResponseData', data)

  if ((data && data.status === 200) || data.status === 201) {
    console.log('==== handleResponseData 111')

    return Promise.resolve(data);
  }
  console.log('==== handleResponseData 222')

  return Promise.reject(data);
};

/**
 * Get request
 * @param options
 * @returns {Promise<any>}
 */

export const GET = async (path: string, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  path = getFullAPILink(path, options);
  return service
    .get(path, {
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};
export const POST = async (path: string, payload: any, options?: {responseType: any} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  path = getFullAPILink(path, options);
  // console.log('==== POST requestHeaders', requestHeaders)
  // console.log('==== POST path', path)


  return service
    .request({
      method: 'POST',
      url: path,
      data: payload,
      responseType: options?.responseType || 'json',
      headers: requestHeaders,
      // withCredentials: false,
      // crossdomain: true
    })
    .then(
      data => {
        console.log('==== POST data', data)

        return handleResponseData(data);
      },
      err => {
        console.log('==== POST err', err)

        return handleError(err);
      },
    );
};

/**
 * PUT request
 * @param {string} path
 * @param payload
 * @param options
 * @returns {Promise<any>}
 */

export const PUT = async (path: string, payload: any, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  path = getFullAPILink(path, options);
  return service
    .request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};

/**
 * DELETE request
 * @param {string} path
 * @param payload
 * @param options
 * @returns {Promise<any>}
 * @constructor
 */

export const DELETE = async (path: string, payload: any, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  path = getFullAPILink(path, options);
  return service
    .request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};
