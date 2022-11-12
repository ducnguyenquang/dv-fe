import { useQuery, UseQueryResult } from 'react-query';
import { CategoryQueryPayload } from 'models/category';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useAdvertisements = (params: CategoryQueryPayload): UseQueryResult<any> => {
  return useQuery(
    advertisementsApi.advertisementsKeys.list(params),
    async () => {
      const data = await advertisementsApi.getAdvertisements(params);
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
