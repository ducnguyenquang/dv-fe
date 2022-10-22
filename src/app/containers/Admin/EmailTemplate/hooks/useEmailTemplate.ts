import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { EmailTemplateDetailPayload, EmailTemplate } from 'models/emailTemplate';
import { emailTemplatesApi, emailTemplatesActions } from 'app/containers/Admin/EmailTemplate';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useEmailTemplate = (params: EmailTemplateDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    emailTemplatesApi.emailTemplatesKeys.detail(params),
    async () => {
      const data = await emailTemplatesApi.getEmailTemplate(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

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
