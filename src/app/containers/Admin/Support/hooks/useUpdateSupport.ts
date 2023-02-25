import { useMutation, useQueryClient } from 'react-query';
import { SupportUpdatePayload } from 'models/support';
import { supportsApi } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateSupport = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  
  return useMutation(
    (params: SupportUpdatePayload) => {
      return supportsApi.updateSupport(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(supportsApi.supportsKeys.lists());
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
