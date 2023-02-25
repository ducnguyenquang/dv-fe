import { useQuery, UseQueryResult } from 'react-query';

import { UserQueryPayload } from 'models/user';
import { usersApi } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useUsers = (params: UserQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    usersApi.usersKeys.list(params),
    async () => {
      const data = await usersApi.getUsers(params);
      return data.data;
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
