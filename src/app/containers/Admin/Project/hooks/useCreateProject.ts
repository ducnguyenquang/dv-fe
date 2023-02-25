import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ProjectCreatePayload } from 'models/project';
import { projectsApi } from 'app/containers/Admin/Project';
import { apiErrorHandler } from 'utils';
import { useIntl } from 'react-intl';

export const useCreateProject = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ProjectCreatePayload) => {
      return projectsApi.createProject(params);
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(projectsApi.projectsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.add.message.success' }));
      },
      onError: (error: any) => {
        apiErrorHandler(error);
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
