import { useMutation } from 'react-query';
import { message } from 'antd';
import { BrandDeletePayload } from 'models/brand';
import { brandsApi } from 'app/containers/Admin/Brand';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useDeleteBrand = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: BrandDeletePayload) => {
      return brandsApi.deleteBrand(params);
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
