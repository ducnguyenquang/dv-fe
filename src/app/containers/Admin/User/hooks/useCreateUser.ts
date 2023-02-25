import { useMutation, useQueryClient } from 'react-query';

import { UserCreatePayload } from 'models/user';
import { usersApi } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateUser = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: UserCreatePayload) => {
      return usersApi.createUser(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(usersApi.usersKeys.lists());
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
