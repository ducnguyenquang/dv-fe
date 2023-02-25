import { useMutation, useQueryClient } from 'react-query';

import { EmailTemplateCreatePayload } from 'models/emailTemplate';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateEmailTemplate = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: EmailTemplateCreatePayload) => {
      return settingsApi.createEmailTemplate(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(settingsApi.settingsKeys.lists());
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
