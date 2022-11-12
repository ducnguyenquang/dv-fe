import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { UserQueryPayload, User } from 'models/user';
import { usersApi, usersActions } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useUsers = (params: UserQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    usersApi.usersKeys.list(params),
    async () => {
      const data = await usersApi.getUsers(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

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
