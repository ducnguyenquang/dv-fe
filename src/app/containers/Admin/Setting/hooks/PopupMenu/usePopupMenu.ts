import { useQuery, UseQueryResult } from 'react-query';
import { PopupMenuDetailPayload } from 'models/popupMenu';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePopupMenu = (params: PopupMenuDetailPayload): UseQueryResult<any> => {
  return useQuery(
    settingsApi.settingsKeys.detail(params),
    async () => {
      const data = await settingsApi.getPopupMenu(params);
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
