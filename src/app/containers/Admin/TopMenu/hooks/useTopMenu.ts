import { useQuery, UseQueryResult } from 'react-query';

import { TopMenuDetailPayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTopMenu = (params: TopMenuDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    topMenusApi.topMenusKeys.detail(params),
    async () => {
      const data = await topMenusApi.getTopMenu(params);
      // console.log('==== data', data)
      // storeEquipmentPaginationModals(data?.page);

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
