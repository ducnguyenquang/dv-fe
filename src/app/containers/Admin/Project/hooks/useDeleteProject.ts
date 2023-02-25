import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ProjectDeletePayload } from 'models/project';
import { projectsApi } from 'app/containers/Admin/Project';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteProject = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ProjectDeletePayload) => {
      return projectsApi.deleteProject(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(projectsApi.projectsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.delete.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
          

        }
      },
    }
  );
};
