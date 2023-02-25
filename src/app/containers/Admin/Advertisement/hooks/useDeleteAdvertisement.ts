import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { AdvertisementDeletePayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteAdvertisement = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: AdvertisementDeletePayload) => {
      return advertisementsApi.deleteAdvertisement(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(advertisementsApi.advertisementsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.delete.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
