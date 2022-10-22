import { useMutation } from 'react-query';
import { message } from 'antd';
import { EmailTemplateDeletePayload } from 'models/emailTemplate';
import { emailTemplatesApi } from 'app/containers/Admin/EmailTemplate';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useDeleteEmailTemplate = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: EmailTemplateDeletePayload) => {
      return emailTemplatesApi.deleteEmailTemplate(params);
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
