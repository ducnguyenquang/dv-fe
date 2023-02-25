import { useMutation, useQueryClient } from 'react-query';
import { TopMenuDeletePayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useDeleteTopMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: TopMenuDeletePayload) => {
      return topMenusApi.deleteTopMenu(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(topMenusApi.topMenusKeys.lists());
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
