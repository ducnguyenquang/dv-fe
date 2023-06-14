import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';

import { ContactUpdatePayload } from 'models/contact';
import { contactsApi } from 'app/containers/Admin/Contact';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useUpdateContact = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ContactUpdatePayload) => {
      return contactsApi.updateContact(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(contactsApi.contactsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.update.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        apiErrorHandler(error);

        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
