import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CategoryUpdatePayload } from 'models/category';
import { categoriesApi, categoriesActions } from 'app/containers/Admin/Category';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';

export const useUpdateCategory = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: CategoryUpdatePayload) => {
      console.log('==== useMutation params',params)

      return categoriesApi.updateCategory(params);
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
