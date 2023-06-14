import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ContactCreatePayload } from 'models/contact';
import { contactsApi } from 'app/containers/Admin/Contact';
import { apiErrorHandler } from 'utils';
import { useIntl } from 'react-intl';

export const useCreateContact = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ContactCreatePayload) => {
      return contactsApi.createContact(params);
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(contactsApi.contactsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.add.message.success' }));
      },
      onError: (error: any) => {
        apiErrorHandler(error);
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
