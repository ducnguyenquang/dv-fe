import { useQuery, UseQueryResult, useMutation, useQueryClient } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductUpdatePayload } from 'models/product';
import { productsApi, productsActions } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { successMessage } from 'common/components/Toast';

export const useUpdateProduct = (): any => {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    async (params: ProductUpdatePayload) => {
      console.log('==== useMutation params',params)

      const data = await productsApi.updateProduct(params);
      return data;
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        queryClient.invalidateQueries(productsApi.productsKeys.lists());

        console.log('==== useUpdateProduct onSuccess data', data)
        successMessage({ id: 'product.message.update.success' });
        // return data;
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
