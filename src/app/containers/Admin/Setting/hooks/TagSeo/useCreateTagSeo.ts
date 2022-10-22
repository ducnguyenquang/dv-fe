import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { TagSeoQueryPayload, TagSeo, TagSeoCreatePayload } from 'models/tagSeo';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { successMessage } from 'common/components/Toast';

export const useCreateTagSeo = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: TagSeoCreatePayload) => {
      return settingsApi.createTagSeo(params);
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        console.log('==== useCreateProduct onSuccess data', data)
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
