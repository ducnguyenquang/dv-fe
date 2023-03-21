import { useQuery, UseQueryResult } from 'react-query';
import { UserDetailPayload } from 'models/user';
import { usersApi } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useUser = (params: UserDetailPayload): UseQueryResult<any> => {
  return useQuery(
    usersApi.usersKeys.detail(params),
    async () => {
      const data = await usersApi.getUser(params);
      return data?.data;
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
