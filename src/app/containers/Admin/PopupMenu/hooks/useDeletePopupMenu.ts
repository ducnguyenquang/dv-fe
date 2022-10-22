import { useMutation } from 'react-query';
import { message } from 'antd';
import { PopupMenuDeletePayload } from 'models/popupMenu';
import { popupMenusApi } from 'app/containers/Admin/PopupMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useDeletePopupMenu = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: PopupMenuDeletePayload) => {
      return popupMenusApi.deletePopupMenu(params);
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
