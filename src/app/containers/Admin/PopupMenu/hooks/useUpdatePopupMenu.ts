import { useMutation, useQueryClient } from 'react-query';

import { PopupMenuUpdatePayload } from 'models/popupMenu';
import { popupMenusApi } from 'app/containers/Admin/PopupMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdatePopupMenu = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PopupMenuUpdatePayload) => {
      return popupMenusApi.updatePopupMenu(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(popupMenusApi.popupMenusKeys.lists());
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
