import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { BrandUpdatePayload } from 'models/brand';
import { brandsApi, brandsActions } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';

export const useUpdateBrand = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: BrandUpdatePayload) => {
      console.log('==== useMutation params',params)

      return brandsApi.updateBrand(params);
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        console.log('==== useUpdateBrand onSuccess data', data)
        // return data;
        // successMessage({ value: 'Update Successfully' });
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
