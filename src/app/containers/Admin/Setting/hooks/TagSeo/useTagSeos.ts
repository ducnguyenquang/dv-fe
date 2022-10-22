import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { TagSeoQueryPayload, TagSeo } from 'models/tagSeo';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTagSeos = (params: TagSeoQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  const storeTagSeoPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(settingsActions.setTagSeos({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await settingsApi.getTagSeos(params);
      // console.log('==== data', data)
      storeTagSeoPaginationModals(data);

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
