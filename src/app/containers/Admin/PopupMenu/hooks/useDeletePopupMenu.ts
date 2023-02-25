import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { PopupMenuDeletePayload } from 'models/popupMenu';
import { popupMenusApi } from 'app/containers/Admin/PopupMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeletePopupMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PopupMenuDeletePayload) => {
      return popupMenusApi.deletePopupMenu(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(popupMenusApi.popupMenusKeys.lists());
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
