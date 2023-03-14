import { useMutation, useQueryClient } from 'react-query';

import { RoutePathCreatePayload } from 'models/routePath';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateRoutePath = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: RoutePathCreatePayload) => {
      return settingsApi.createRoutePath(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(settingsApi.settingsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.create.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};