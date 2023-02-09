import { Carousel } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Project } from 'models/project';
import { useIntl } from 'react-intl';
import { ProjectItem } from './components/ProjectItem';
import './Projects.less';
import { useMemo, useContext } from 'react';
import { Context as AppContext } from 'app/context/appContext';

const Projects = (): JSX.Element => {
  const intl = useIntl();
  const { orientation, isMobile } = useContext(AppContext);

  // const { data: products, isLoading } = productsHooks.useProducts({
  //   pagination: {
  //     limit: 5,
  //     offset: 0,
  //   },
  // });

  const projects: {
    data: Project[];
  } = {
    data: [
      {
        name: 'Himlam',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led',
        description: '',
        images: '/images/himlam-3-4482.jpeg',
      },
      {
        name: 'Sky center',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/sky-center-3-5635.png',
      },
      {
        name: 'Mysterry',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/mysterry-1-1345.jpeg',
      },
      {
        name: 'Himlam',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led',
        description: '',
        images: '/images/himlam-3-4482.jpeg',
      },
      {
        name: 'Sky center',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/sky-center-3-5635.png',
      },
      {
        name: 'Himlam',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led',
        description: '',
        images: '/images/himlam-3-4482.jpeg',
      },
      {
        name: 'Sky center',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/sky-center-3-5635.png',
      },
      {
        name: 'Mysterry',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/mysterry-1-1345.jpeg',
      },
      {
        name: 'Himlam',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led',
        description: '',
        images: '/images/himlam-3-4482.jpeg',
      },
      {
        name: 'Sky center',
        summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
        description: '',
        images: '/images/sky-center-3-5635.png',
      },
    ],
  };

  const threeProductFirst = useMemo(() => {
    const size = 3;
    return projects?.data.slice(0, size).map((data: Project) => {
      return <ProjectItem data={data} key={Math.random()} />;
    });
  }, [projects?.data]);

  return (
    <div className={`project ${isMobile && 'project-mobile'} ${orientation && `project-mobile-${orientation}`}`}>
      <div className="header">{intl.formatMessage({ id: 'dashboard.project.title' })}</div>
      <div className="summary">{intl.formatMessage({ id: 'dashboard.project.content' })}</div>

      <div className="projectBlock">
        <div className="animationBlock">
          {projects?.data?.map((data: Project) => {
            return <ProjectItem data={data} key={Math.random()} />;
          })}
          {threeProductFirst}
        </div>
      </div>
    </div>
  );
};

export default Projects;
