import { useMutation, useQueryClient } from 'react-query';
import { PageUpdatePayload } from 'models/page';
import { pagesApi } from 'app/containers/Admin/Page';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdatePage = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PageUpdatePayload) => {
      return pagesApi.updatePage(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(pagesApi.pagesKeys.lists());
        message.success(intl.formatMessage({ id: 'common.update.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
