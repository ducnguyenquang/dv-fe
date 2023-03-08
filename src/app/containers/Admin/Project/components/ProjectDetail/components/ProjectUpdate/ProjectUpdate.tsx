import { Project } from 'models/project';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import { projectsHooks } from 'app/containers/Admin/Project';
import { ProjectDetailForm } from '../ProjectDetailForm';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectUpdate = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutateAsync: updateProject, isLoading: isLoadingUpdateProject } = projectsHooks.useUpdateProject();
  const [projectDetail, setProjectDetail] = useState<Project>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: projectDetailData, isLoading: isLoadingProjectDetail } = projectsHooks.useProject({ id });
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateProject({
      ...values,
      _id: projectDetailData?._id,
      // images: fileList,
    }).then((item: any) => {
      setProjectDetail(item?.data);
      // setFileList(item?.data?.images);
      setDefaultValue({
        ...projectDetailData,
        description: decodeURIComponent(projectDetailData?.description),
        slug: decodeURIComponent(projectDetailData?.slug),
      });
    });
  }, [projectDetailData, updateProject])

  useEffect(() => {
    if (projectDetailData && !isLoadingProjectDetail) {
      setProjectDetail(projectDetailData);
      // setFileList(projectDetailData?.images);
      setDefaultValue({
        ...projectDetailData,
        description: decodeURIComponent(projectDetailData?.description),
        specification: decodeURIComponent(projectDetailData?.specification),
        slug: decodeURIComponent(projectDetailData?.slug),
      });
    }
  }, [projectDetailData, isLoadingProjectDetail]);

  return defaultValue && <ProjectDetailForm key={'projectUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingProjectDetail || isLoadingUpdateProject} />
};

export default ProjectUpdate;
