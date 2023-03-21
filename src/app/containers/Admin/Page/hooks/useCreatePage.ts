import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { PageCreatePayload } from 'models/page';
import { pagesApi } from 'app/containers/Admin/Page';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useCreatePage = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: PageCreatePayload) => {
      return pagesApi.createPage(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(pagesApi.pagesKeys.lists());
        message.success(intl.formatMessage({ id: 'common.create.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
