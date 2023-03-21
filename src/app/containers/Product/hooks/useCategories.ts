import { useQuery, UseQueryResult } from 'react-query';

import { CategoryQueryPayload } from 'models/category';
import { productsApi } from 'app/containers/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useCategories = (params: CategoryQueryPayload): UseQueryResult<any> => {
  return useQuery(
    productsApi.productsKeys.list(params),
    async () => {
      const data = await productsApi.getCaterogies(params);
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
