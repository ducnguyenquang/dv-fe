import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { EmailTemplateQueryPayload, EmailTemplate } from 'models/emailTemplate';
import { emailTemplatesApi, emailTemplatesActions } from 'app/containers/Admin/EmailTemplate';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useEmailTemplates = (params: EmailTemplateQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  // const storeEmailTemplatePaginationModals = useCallback(
  //   ({data, pagination}: {data: any, pagination: any}) => {
  //     dispatch(settingsActions.setEmailTemplates({data, pagination}));
  //   },
  //   [dispatch]
  // );

  return useQuery(
    emailTemplatesApi.emailTemplatesKeys.list(params),
    async () => {
      const data = await emailTemplatesApi.getEmailTemplates(params);
      // console.log('==== data', data)
      // storeEmailTemplatePaginationModals(data);

      return data?.data;
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
