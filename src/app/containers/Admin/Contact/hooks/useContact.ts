import { useQuery, UseQueryResult } from 'react-query';

import { ContactDetailPayload } from 'models/contact';
import { contactsApi } from 'app/containers/Admin/Contact';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useContact = (params: ContactDetailPayload): UseQueryResult<any> => {
  return useQuery(
    contactsApi.contactsKeys.detail(params),
    async () => {
      const data = await contactsApi.getContact(params);
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
