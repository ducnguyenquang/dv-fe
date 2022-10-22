import { useMutation } from 'react-query';
import { message } from 'antd';
import { AdvertisementDeletePayload } from 'models/advertisement';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useDeleteAdvertisement = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: AdvertisementDeletePayload) => {
      return settingsApi.deleteAdvertisement(params);
    },
    {
      onSuccess: () => {
        message.success('Delete Successfully');
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
          

        }
      },
    }
  );
};
