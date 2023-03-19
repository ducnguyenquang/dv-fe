import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { PopupMenuQueryPayload } from 'models/popupMenu';
import { settingsApi, settingsActions } from 'app/containers/Admin/Setting';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

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
