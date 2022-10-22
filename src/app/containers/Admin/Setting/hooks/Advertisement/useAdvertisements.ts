import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AdvertisementQueryPayload, Advertisement } from 'models/advertisement';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useAdvertisements = (params: AdvertisementQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  // const storeAdvertisementPaginationModals = useCallback(
  //   ({data, pagination}: {data: any, pagination: any}) => {
  //     dispatch(settingsActions.setAdvertisements({data, pagination}));
  //   },
  //   [dispatch]
  // );

  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await settingsApi.getAdvertisements(params);
      // console.log('==== data', data)
      // storeAdvertisementPaginationModals(data);

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
