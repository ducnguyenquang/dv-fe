import { useQuery, UseQueryResult, useMutation, useQueryClient } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductQueryPayload, Product, ProductCreatePayload } from 'models/product';
import { productsApi, productsActions } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { successMessage } from 'common/components/Toast';
import ToastMessage from 'app/containers/Template/components/AdminTemplate/components/ToastMessage/ToastMessage';

export const useCreateProduct = (): any => {
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
    (params: ProductCreatePayload) => {
      return productsApi.createProduct(params);
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        queryClient.invalidateQueries(productsApi.productsKeys.lists());
        // console.log('==== useCreateProduct onSuccess data', data)
        ToastMessage({type:'success', content: 'product.message.success'})

        // return data;
        // successMessage({ value: 'Update Successfully' });
      },
      onError: (error: any) => {
        // console.log('==== useCreateProduct error', error)
        apiErrorHandler(error);
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
