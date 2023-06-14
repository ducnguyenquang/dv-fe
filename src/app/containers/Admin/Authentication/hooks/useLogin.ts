import { useQuery, UseQueryResult } from 'react-query';
import { LoginPayload, UserAuthentication } from 'models/user';
import { authenticationActions, authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { RoleOptions } from 'constants/user';

export const useLogin = (params: LoginPayload): UseQueryResult<UserAuthentication> => {
  const dispatch = useDispatch();

  const storeLoginData = useCallback(
    ({ data }: { data: any }) => {
      dispatch(authenticationActions.setCurrentUser(data));
      // dispatch(authenticationActions.setAccessToken(data.token));
    },
    [dispatch]
  );

  const storeClientLoginData = useCallback(
    ({ data }: { data: any }) => {
      dispatch(authenticationActions.setClientCurrentUser(data));
      // dispatch(authenticationActions.setAccessToken(data.token));
    },
    [dispatch]
  );

  return useQuery(
    authenticationApi.authenticationKeys.login(params),
    async () => {
      if (!params.email || !params.password) return;
      // await authenticationApi.login(params);
      
      const data = await authenticationApi.login(params);
      await dispatch(authenticationActions.logout);
      if (params.role === RoleOptions.CUSTOMER) {
        await storeClientLoginData(data);
      } else {
        await storeLoginData(data);
      }
      return data.data;
    },
    {
      enabled: false,
      // onSuccess: async (data: any) => {
      //   await dispatch(authenticationActions.logout);
      //   await storeLoginData(data);
      //   return data.data;

      // },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }

        message.error(error?.response?.data);

      },
    }
  );
};
