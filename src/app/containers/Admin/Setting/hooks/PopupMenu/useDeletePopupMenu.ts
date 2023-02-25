import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { PopupMenuDeletePayload } from 'models/popupMenu';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeletePopupMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PopupMenuDeletePayload) => {
      return settingsApi.deletePopupMenu(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(settingsApi.settingsKeys.lists());
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
