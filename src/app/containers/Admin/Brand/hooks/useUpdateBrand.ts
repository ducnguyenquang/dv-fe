import { useMutation, useQueryClient } from 'react-query';
import { BrandUpdatePayload } from 'models/brand';
import { brandsApi } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateBrand = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: BrandUpdatePayload) => {
      return brandsApi.updateBrand(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(brandsApi.brandsKeys.lists());
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
