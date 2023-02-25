import { useMutation } from 'react-query';
import { UserCreatePayload } from 'models/user';
import { authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';
import { message } from 'antd';

export const useRegister = (): any => {
  const intl = useIntl();

  return useMutation(
    (params: UserCreatePayload) => {
      return authenticationApi.register(params);
    },
    {
      onSuccess: (data) => {
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
