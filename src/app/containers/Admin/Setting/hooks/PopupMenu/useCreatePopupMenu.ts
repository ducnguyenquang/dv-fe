import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { PopupMenuQueryPayload, PopupMenu, PopupMenuCreatePayload } from 'models/popupMenu';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { successMessage } from 'common/components/Toast';
import { message } from 'antd';

export const useCreatePopupMenu = (): any => {
  
  return useMutation(
    (params: PopupMenuCreatePayload) => {
      return settingsApi.createPopupMenu(params);
    },
    {
      onSuccess: (data) => {
        message.success('Delete Successfully');
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
