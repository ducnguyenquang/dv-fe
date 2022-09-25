import { useMutation } from 'react-query';
import { message } from 'antd';
import { AdvertisementDeletePayload } from 'models/advertisement';
import { advertisementsApi } from 'app/containers/Admin/Advertisement';
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
      return advertisementsApi.deleteAdvertisement(params);
    },
    {
      onSuccess: () => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        message.success('Delete Successfully');
        // successMessage({ value: 'Update Successfully' });
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
