import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { EmailTemplateDeletePayload } from 'models/emailTemplate';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteEmailTemplate = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: EmailTemplateDeletePayload) => {
      return settingsApi.deleteEmailTemplate(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(settingsApi.settingsKeys.lists());
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
