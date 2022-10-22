import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CategoryQueryPayload, Category } from 'models/category';
import { brandsApi, brandsActions } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useBrands = (params: CategoryQueryPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    brandsApi.brandsKeys.list(params),
    async () => {
      const data = await brandsApi.getBrands(params);
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
