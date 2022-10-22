import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SupportDetailPayload, Support } from 'models/support';
import { supportsApi, supportsActions } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useSupport = (params: SupportDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    supportsApi.supportsKeys.detail(params),
    async () => {
      const data = await supportsApi.getSupport(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

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
