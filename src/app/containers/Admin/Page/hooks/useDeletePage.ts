import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { PageDeletePayload } from 'models/page';
import { pagesApi } from 'app/containers/Admin/Page';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeletePage = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PageDeletePayload) => {
      return pagesApi.deletePage(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(pagesApi.pagesKeys.lists());
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
