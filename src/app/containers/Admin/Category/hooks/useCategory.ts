import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CategoryDetailPayload, Category } from 'models/category';
import { categoriesApi, categoriesActions } from 'app/containers/Admin/Category';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useCategory = (params: CategoryDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    categoriesApi.categoriesKeys.detail(params),
    async () => {
      const data = await categoriesApi.getCategory(params);
      console.log('==== data', data)
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
