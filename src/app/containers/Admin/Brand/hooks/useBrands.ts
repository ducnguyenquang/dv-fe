import { useQuery, UseQueryResult } from 'react-query';
import { CategoryQueryPayload } from 'models/category';
import { brandsApi } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useBrands = (params: CategoryQueryPayload): UseQueryResult<any> => {
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
