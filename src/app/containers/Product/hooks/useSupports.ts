import { useQuery, UseQueryResult } from 'react-query';

import { SupportQueryPayload } from 'models/support';
import { productsApi } from 'app/containers/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useSupports = (params: SupportQueryPayload): UseQueryResult<any> => {
  return useQuery(
    productsApi.productsKeys.supports(),
    async () => {
      const data = await productsApi.getSupports(params);
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
