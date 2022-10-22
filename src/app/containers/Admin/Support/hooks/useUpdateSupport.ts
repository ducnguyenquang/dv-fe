import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SupportUpdatePayload } from 'models/support';
import { supportsApi, supportsActions } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';

export const useUpdateSupport = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: SupportUpdatePayload) => {
      return supportsApi.updateSupport(params);
    },
    {
      onSuccess: (data) => {
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
