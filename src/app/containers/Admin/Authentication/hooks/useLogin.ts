import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { LoginPayload, UserAuthentication } from 'models/user';
import { authenticationActions, authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useLogin = (params: LoginPayload): UseQueryResult<UserAuthentication> => {
  const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(authenticationApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  console.log('==== useLogin params', params)

  return useQuery(
    authenticationApi.authenticationKeys.login(params),
    async () => {
      console.log('==== params', params)
      if (!params.email || !params.password) return;
      const data = await authenticationApi.login(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

      return data.data;
    },
    {
      // keepPreviousData: true,
      // cacheTime: 0,
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
