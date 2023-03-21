import { useQuery, UseQueryResult } from 'react-query';
import { PopupMenuQueryPayload } from 'models/popupMenu';
import { popupMenusApi } from 'app/containers/Admin/PopupMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePopupMenus = (params: PopupMenuQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    popupMenusApi.popupMenusKeys.list(params),
    async () => {
      const data = await popupMenusApi.getPopupMenus(params);
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
