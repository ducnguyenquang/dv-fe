import { Button } from 'antd';
import { Project } from 'models/project';
import './ProjectItem.less';
import { useContext } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { useNavigate } from 'react-router-dom';
interface IProps {
  data?: Project;
}

const ProjectItem = ({ data }: IProps): JSX.Element => {
  const { orientation, isMobile } = useContext(AppContext);
  const navigate = useNavigate();

  return <Button type='link' onClick={() => navigate(`/project/${data?.slug}`)} className={`projectItem ${isMobile && 'projectItem-mobile'} ${isMobile && orientation && `projectItem-mobile-${orientation}`}`}>
  <div className="image">
    <img
      alt="logo"
      src={data?.images?.[0]?.url || '/images/no-image.png'}
      onError={error => {
        error.currentTarget.src = '/images/no-image.png';
        error.currentTarget.onerror = null;
      }}
    />
  </div>
  <div className="content">
    <div className="information">
      <div className="title">{data?.name}</div>
      <div className="description">{data?.summary}</div>
    </div>
  </div>
</Button>
}

export default ProjectItem;
