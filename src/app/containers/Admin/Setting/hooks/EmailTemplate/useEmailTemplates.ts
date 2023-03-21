import { useQuery, UseQueryResult } from 'react-query';
import { EmailTemplateQueryPayload } from 'models/emailTemplate';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useEmailTemplates = (params: EmailTemplateQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await settingsApi.getEmailTemplates(params);
      return data;
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
