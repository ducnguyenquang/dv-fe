import { useMutation, useQueryClient } from 'react-query';

import { TopMenuUpdatePayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateTopMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: TopMenuUpdatePayload) => {
      return topMenusApi.updateTopMenu(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(topMenusApi.topMenusKeys.lists());
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
