import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ContactQueryPayload } from 'models/contact';
import { contactsApi, contactsActions } from 'app/containers/Admin/Contact';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useContacts = (params: ContactQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  const storeContactPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(contactsActions.setContacts({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    contactsApi.contactsKeys.list(params),
    async () => {
      const data = await contactsApi.getContacts(params);
      storeContactPaginationModals(data);
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
