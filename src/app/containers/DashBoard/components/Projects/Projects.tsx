import { Project } from 'models/project';
import { useIntl } from 'react-intl';
import { ProjectItem } from './components/ProjectItem';
import './Projects.less';
import { useContext } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { templatesHooks } from 'app/containers/Template';

const Projects = (): JSX.Element => {
  const intl = useIntl();
  const { orientation, isMobile } = useContext(AppContext);

  const { data: projects } = templatesHooks.useProjects({
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  return (
    <div id='project' className={`project ${isMobile && 'project-mobile'} ${isMobile && orientation && `project-mobile-${orientation}`}`}>
      <div className="header">{intl.formatMessage({ id: 'dashboard.project.title' })}</div>
      <div className="summary">{intl.formatMessage({ id: 'dashboard.project.content' })}</div>

      <div className="projectBlock">
        <div className="animationBlock">
          {projects?.data?.map((data: Project) => {
            return <ProjectItem data={data} key={Math.random()} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
