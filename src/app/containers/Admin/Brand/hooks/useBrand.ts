import { useQuery, UseQueryResult } from 'react-query';
import { BrandDetailPayload } from 'models/brand';
import { brandsApi } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useBrand = (params: BrandDetailPayload): UseQueryResult<any> => {
  return useQuery(
    brandsApi.brandsKeys.detail(params),
    async () => {
      const data = await brandsApi.getBrand(params);
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
