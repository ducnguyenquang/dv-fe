import { useQuery, UseQueryResult } from 'react-query';

import { ProductDetailPayload } from 'models/product';
import { productsApi } from 'app/containers/Admin/Product';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useProduct = (params: ProductDetailPayload): UseQueryResult<any> => {
  return useQuery(
    productsApi.productsKeys.detail(params),
    async () => {
      const data = await templatesApi.getProduct(params);
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
