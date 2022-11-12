import { useQuery, UseQueryResult } from 'react-query';
import { LoginPayload, UserAuthentication } from 'models/user';
import { authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useLogin = (params: LoginPayload): UseQueryResult<UserAuthentication> => {
  
  return useQuery(
    authenticationApi.authenticationKeys.login(params),
    async () => {
      if (!params.email || !params.password) return;
      const data = await authenticationApi.login(params);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
