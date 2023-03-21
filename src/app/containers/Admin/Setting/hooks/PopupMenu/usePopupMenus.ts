import { useQuery, UseQueryResult } from 'react-query';
import { PopupMenuQueryPayload } from 'models/popupMenu';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePopupMenus = (params: PopupMenuQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await settingsApi.getPopupMenus(params);
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
