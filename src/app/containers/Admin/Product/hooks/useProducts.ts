import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductQueryPayload } from 'models/product';
import { productsApi, productsActions } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useProducts = (params: ProductQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  const storeProductPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(productsActions.setProducts({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    productsApi.productsKeys.list(params),
    async () => {
      const data = await productsApi.getProducts(params);
      storeProductPaginationModals(data);
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
