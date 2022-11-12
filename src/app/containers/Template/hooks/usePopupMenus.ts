import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { PopupMenuQueryPayload, PopupMenu } from 'models/popupMenu';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
// import { templatesApi } from './index';

import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { templatesApi } from '../api';

export const usePopupMenus = (params: PopupMenuQueryPayload): UseQueryResult<any> => {
  const dispatch = useDispatch();
  
  const storePopupMenuPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(settingsActions.setPopupMenus({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await templatesApi.getPopupMenus(params);
      // console.log('==== data', data)
      storePopupMenuPaginationModals(data);

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
