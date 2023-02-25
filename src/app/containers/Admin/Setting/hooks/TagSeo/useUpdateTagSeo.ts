import { useMutation, useQueryClient } from 'react-query';

import { TagSeoUpdatePayload } from 'models/tagSeo';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateTagSeo = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: TagSeoUpdatePayload) => {
      return settingsApi.updateTagSeo(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(settingsApi.settingsKeys.lists());
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
