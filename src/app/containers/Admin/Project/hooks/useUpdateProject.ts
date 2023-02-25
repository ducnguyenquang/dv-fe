import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';

import { ProjectUpdatePayload } from 'models/project';
import { projectsApi } from 'app/containers/Admin/Project';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useUpdateProject = (): any => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  return useMutation(
    (params: ProjectUpdatePayload) => {
      return projectsApi.updateProject(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(projectsApi.projectsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.update.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        apiErrorHandler(error);

        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
