import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SupportQueryPayload, Support } from 'models/support';
import { supportsApi, supportsActions } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useSupports = (params: SupportQueryPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    supportsApi.supportsKeys.list(params),
    async () => {
      const data = await supportsApi.getSupports(params);
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
