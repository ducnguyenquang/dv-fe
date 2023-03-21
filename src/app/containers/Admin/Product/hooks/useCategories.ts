import { useQuery, UseQueryResult } from 'react-query';
import { CategoryQueryPayload } from 'models/category';
import { productsApi } from 'app/containers/Admin/Product';
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
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
