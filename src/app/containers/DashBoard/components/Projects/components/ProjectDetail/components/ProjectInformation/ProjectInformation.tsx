import { Project } from 'models/project';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectGallery from '../ProjectGallery/ProjectGallery';
import './ProjectInformation.less';
import { pdfjs } from 'react-pdf';
import { projectsHooks } from 'app/containers/Admin/Project';
import { Descriptions, Rate } from 'antd';

import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { ORIENTATION } from 'constants/common';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ProjectInformation = (): JSX.Element => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>({});
  const { isMobile, orientation } = useContext(AppContext);


  const { data: projectDetailData, isLoading: isLoadingProjectDetail } = projectsHooks.useProject({ id });

  useEffect(() => {
    if (projectDetailData && !isLoadingProjectDetail) {
      const data = {
        ...projectDetailData,
        description: decodeURIComponent(projectDetailData.description),
        specification: decodeURIComponent(projectDetailData.specification),
        slug: decodeURIComponent(projectDetailData.slug),
      };
      setProjectDetail(data);
    }
  }, [isLoadingProjectDetail, projectDetailData]);

  return (
    <div className={`projectInfo ${isMobile && orientation === ORIENTATION.PORTRAIT && 'projectInfo-mobile'}`}>
      <div className="projectInfo-block">
        <div className="gallery">
          <ProjectGallery images={projectDetail?.images} />
        </div>
        <div className="content">
          <Descriptions className="information" title={projectDetail?.name}>
            <Descriptions.Item span={3}>
              <Rate disabled defaultValue={4} />
            </Descriptions.Item>
            <Descriptions.Item span={3} className="summary">
              {projectDetail?.summary}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <div className='projectInfo-content' dangerouslySetInnerHTML={{ __html: projectDetail?.description as string }} />
    </div>
  );
};

export default ProjectInformation;
