import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ContactDeletePayload } from 'models/contact';
import { contactsApi } from 'app/containers/Admin/Contact';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteContact = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ContactDeletePayload) => {
      return contactsApi.deleteContact(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(contactsApi.contactsKeys.lists());
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
