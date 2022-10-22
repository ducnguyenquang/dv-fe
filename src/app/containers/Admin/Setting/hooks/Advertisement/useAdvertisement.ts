import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AdvertisementDetailPayload, Advertisement } from 'models/advertisement';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useAdvertisement = (params: AdvertisementDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    settingsApi.settingsKeys.detail(params),
    async () => {
      const data = await settingsApi.getAdvertisement(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

      return data?.data;
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
