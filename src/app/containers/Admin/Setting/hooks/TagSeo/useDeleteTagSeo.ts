import { useMutation } from 'react-query';
import { message } from 'antd';
import { TagSeoDeletePayload } from 'models/tagSeo';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useDeleteTagSeo = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: TagSeoDeletePayload) => {
      return settingsApi.deleteTagSeo(params);
    },
    {
      onSuccess: () => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        console.log('==== onSuccess')
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
