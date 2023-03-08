import { useQuery, UseQueryResult } from 'react-query';

import { CommonQueryPayload } from 'models/common';
import { settingPagesApi } from 'app/containers/Admin/SettingPage';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTemplates = (params: CommonQueryPayload): UseQueryResult<any> => {
  return useQuery(
    settingPagesApi.settingPagesKeys.list(params),
    async () => {
      const data = await settingPagesApi.getTemplates(params);
      return data;
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
