import { useMutation, useQueryClient } from 'react-query';

import { AdvertisementUpdatePayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateAdvertisement = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: AdvertisementUpdatePayload) => {
      return advertisementsApi.updateAdvertisement(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(advertisementsApi.advertisementsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.update.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
