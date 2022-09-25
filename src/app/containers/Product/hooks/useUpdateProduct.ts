import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductUpdatePayload } from 'models/product';
import { productsApi, productsActions } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { successMessage } from 'common/components/Toast';

export const useUpdateProduct = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: ProductUpdatePayload) => {
      console.log('==== useMutation params',params)

      return productsApi.updateProduct(params);
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        console.log('==== useUpdateProduct onSuccess data', data)
        return data;
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