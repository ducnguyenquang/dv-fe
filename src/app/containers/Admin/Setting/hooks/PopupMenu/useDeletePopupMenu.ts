import { useMutation } from 'react-query';
import { message } from 'antd';
import { PopupMenuDeletePayload } from 'models/popupMenu';
import { settingsApi } from 'app/containers/Admin/Setting';
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
      return settingsApi.deletePopupMenu(params);
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
