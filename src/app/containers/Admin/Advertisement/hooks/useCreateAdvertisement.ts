import { useMutation } from 'react-query';

import { AdvertisementCreatePayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useCreateAdvertisement = (): any => {

  return useMutation(
    (params: AdvertisementCreatePayload) => {
      return advertisementsApi.createAdvertisement(params);
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
