import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ContactCreatePayload } from 'models/contact';
// import { createContact } from 'app/containers/Template/api';
import { apiErrorHandler } from 'utils';
import { useIntl } from 'react-intl';
import { templatesApi } from '../api';

export const useCreateContact = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ContactCreatePayload) => {
      return templatesApi.createContact(params);
    },
    {
      onSuccess: data => {
        // queryClient.invalidateQueries(templatesApi.contactsKeys.lists());
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
