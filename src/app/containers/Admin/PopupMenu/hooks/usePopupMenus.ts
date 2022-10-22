import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { PopupMenuQueryPayload, PopupMenu } from 'models/popupMenu';
import { popupMenusApi, popupMenusActions } from 'app/containers/Admin/PopupMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePopupMenus = (params: PopupMenuQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  // const storePopupMenuPaginationModals = useCallback(
  //   ({data, pagination}: {data: any, pagination: any}) => {
  //     dispatch(settingsActions.setPopupMenus({data, pagination}));
  //   },
  //   [dispatch]
  // );

  return useQuery(
    popupMenusApi.popupMenusKeys.list(params),
    async () => {
      const data = await popupMenusApi.getPopupMenus(params);
      // console.log('==== data', data)
      // storePopupMenuPaginationModals(data);

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
