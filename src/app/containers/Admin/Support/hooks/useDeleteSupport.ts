import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { SupportDeletePayload } from 'models/support';
import { supportsApi } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteSupport = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  
  return useMutation(
    (params: SupportDeletePayload) => {
      return supportsApi.deleteSupport(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(supportsApi.supportsKeys.lists());
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
