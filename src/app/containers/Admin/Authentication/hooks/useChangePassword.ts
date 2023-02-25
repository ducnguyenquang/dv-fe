import { useMutation } from 'react-query';
import { ChangePasswordPayload } from 'models/user';
import { authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';
import { message } from 'antd';

export const useChangePassword = (): any => {
  const intl = useIntl();

  return useMutation(
    (params: ChangePasswordPayload) => {
      return authenticationApi.changePassword(params);
    },
    {
      onSuccess: (data) => {
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
