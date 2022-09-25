import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { BrandDetailPayload, Brand } from 'models/brand';
import { brandsApi, brandsActions } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useBrand = (params: BrandDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    brandsApi.brandsKeys.detail(params),
    async () => {
      const data = await brandsApi.getBrand(params);
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
