import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AdvertisementUpdatePayload } from 'models/advertisement';
import { advertisementsApi, advertisementsActions } from 'app/containers/Admin/Advertisement';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';

export const useUpdateAdvertisement = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: AdvertisementUpdatePayload) => {
      return advertisementsApi.updateAdvertisement(params);
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
