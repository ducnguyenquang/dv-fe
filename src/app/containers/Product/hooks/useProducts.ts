import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductQueryPayload, Product } from 'models/product';
import { productsApi, productsActions } from 'app/containers/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useProducts = (params: ProductQueryPayload): UseQueryResult<{ data: Product[] }> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );

  return useQuery(
    productsApi.productsKeys.list(params),
    async () => {
      const data = await productsApi.getProducts(params);
      console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

      return data;
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
