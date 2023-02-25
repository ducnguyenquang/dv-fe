import { useMutation, useQueryClient } from 'react-query';

import { UserUpdatePayload } from 'models/user';
import { usersApi } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateUser = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: UserUpdatePayload) => {
      return usersApi.updateUser(params);
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(usersApi.usersKeys.lists());
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
