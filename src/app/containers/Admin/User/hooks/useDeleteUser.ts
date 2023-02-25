import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { UserDeletePayload } from 'models/user';
import { usersApi } from 'app/containers/Admin/User';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteUser = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  
  return useMutation(
    (params: UserDeletePayload) => {
      return usersApi.deleteUser(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(usersApi.usersKeys.lists());
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
