import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { BrandDeletePayload } from 'models/brand';
import { brandsApi } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteBrand = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: BrandDeletePayload) => {
      return brandsApi.deleteBrand(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(brandsApi.brandsKeys.lists());
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
