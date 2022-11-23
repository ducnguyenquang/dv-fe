import { useMutation, useQuery, UseQueryResult } from 'react-query';
import { ChangePasswordPayload, UserAuthentication } from 'models/user';
import { authenticationApi } from 'app/containers/Admin/Authentication';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useChangePassword = (): any => {

  return useMutation(
    (params: ChangePasswordPayload) => {
      return authenticationApi.changePassword(params);
    },
    {
      onSuccess: (data) => {
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};

// export const useChangePassword = (params: ChangePasswordPayload): UseQueryResult<UserAuthentication> => {
//   return useQuery(
//     authenticationApi.authenticationKeys.changePassword(params),
//     async () => {
//       if (!params.email || !params.password) return;
//       const data = await authenticationApi.changePassword(params);
//       return data.data;
//     },
//     {
//       onError: (error: ErrorResponse) => {
//         if (error?.response?.errors?.length) {
//           apiErrorHandler(error?.response?.errors);
//         }
//       },
//     }
//   );
// };
