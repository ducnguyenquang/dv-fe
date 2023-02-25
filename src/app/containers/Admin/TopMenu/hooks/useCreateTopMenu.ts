import { useMutation, useQueryClient } from 'react-query';

import { TopMenuCreatePayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';
import { message } from 'antd';

export const useCreateTopMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: TopMenuCreatePayload) => {
      return topMenusApi.createTopMenu(params);
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(topMenusApi.topMenusKeys.lists());
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
