import { useMutation, useQueryClient } from 'react-query';

import { CommonDeletePayload } from 'models/common';
import { settingPagesApi } from 'app/containers/Admin/SettingPage';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useDeleteTemplate = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: CommonDeletePayload) => {
      return settingPagesApi.deleteTemplate(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(settingPagesApi.settingPagesKeys.lists());
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
