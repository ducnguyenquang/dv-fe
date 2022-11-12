import { useMutation } from 'react-query';

import { AdvertisementUpdatePayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useUpdateAdvertisement = (): any => {
  return useMutation(
    (params: AdvertisementUpdatePayload) => {
      return advertisementsApi.updateAdvertisement(params);
    },
    {
      onSuccess: (data) => {
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
