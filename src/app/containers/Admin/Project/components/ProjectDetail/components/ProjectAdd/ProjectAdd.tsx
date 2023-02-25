import { projectsHooks } from 'app/containers/Admin/Project';
import { ProjectDetailForm } from '../ProjectDetailForm';
import { useCallback } from 'react';

const ProjectAdd = (): JSX.Element => {
  const { mutateAsync: createProject, isLoading: isLoadingCreateProject } = projectsHooks.useCreateProject();

  const onFinish = useCallback(async (values: any) => {
    await createProject(values);
  },[createProject]);

  return <ProjectDetailForm key={'projectAdd'} onFinish={onFinish} isLoading={isLoadingCreateProject} />;
};

export default ProjectAdd;
