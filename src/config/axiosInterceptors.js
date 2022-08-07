import { axios, storage } from 'utils';
import { authApi, authActions } from 'Components/Auth';

const RENEW_TIMEOUT = 1000;
const MAX_RENEW_TOKEN_TRIALS = 5;

let failedQueue = [];
let isRefreshing = false;
let refreshingRetryCount = 0;

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// TODO: Add token handlers for GraphQL, remove Axios !!
export default store => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error?.config;

      if (
        error?.response?.status === 401 &&
        !originalRequest?._retry &&
        originalRequest.headers.Authorization !== undefined
      ) {
        const isRefreshRequest = originalRequest?.url === 'auth/refresh';

        if (isRefreshing && !isRefreshRequest) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.setAuthToken(token);
              return axios(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        if (refreshingRetryCount < MAX_RENEW_TOKEN_TRIALS) {
          return new Promise((resolve, reject) => {
            const renew = trialNumber => {
              authApi
                .renewToken()
                .then(({ data: { token, refreshToken } }) => {
                  originalRequest.headers['X-Auth-Token'] = token;
                  axios.setAuthToken(token);
                  storage.setAuthToken(token);
                  storage.setRefreshToken(refreshToken);
                  processQueue(null, token);
                  resolve(axios.request(originalRequest));
                })
                .catch(err => {
                  if (trialNumber === MAX_RENEW_TOKEN_TRIALS) {
                    store.dispatch(authActions.logoutSuccess());
                    processQueue(err, null);
                    reject(err);
                  }
                })
                .finally(() => {
                  isRefreshing = false;
                  refreshingRetryCount = 0;
                });
            };

            refreshingRetryCount += 1;

            if (refreshingRetryCount > 1) {
              setTimeout(() => {
                renew(refreshingRetryCount);
              }, RENEW_TIMEOUT);
            } else {
              renew(refreshingRetryCount);
            }
          });
        }

        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
