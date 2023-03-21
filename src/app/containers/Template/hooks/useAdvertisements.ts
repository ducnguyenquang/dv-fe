import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AdvertisementQueryPayload } from 'models/advertisement';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';

import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { templatesApi } from '../api';

export const useAdvertisements = (params: AdvertisementQueryPayload): UseQueryResult<any> => {
  const dispatch = useDispatch();
  
  const storeAdvertisementPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(settingsActions.setAdvertisements({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await templatesApi.getAdvertisements(params);
      storeAdvertisementPaginationModals(data);
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
