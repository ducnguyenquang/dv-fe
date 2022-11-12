import { useQuery, UseQueryResult } from 'react-query';

import { AdvertisementDetailPayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useAdvertisement = (params: AdvertisementDetailPayload): UseQueryResult<any> => {

  return useQuery(
    advertisementsApi.advertisementsKeys.detail(params),
    async () => {
      const data = await advertisementsApi.getAdvertisement(params);
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
