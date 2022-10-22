import { useMutation } from 'react-query';

import { EmailTemplateCreatePayload } from 'models/emailTemplate';
import { emailTemplatesApi } from 'app/containers/Admin/EmailTemplate';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';

export const useCreateEmailTemplate = (): any => {
  
  return useMutation(
    (params: EmailTemplateCreatePayload) => {
      return emailTemplatesApi.createEmailTemplate(params);
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
