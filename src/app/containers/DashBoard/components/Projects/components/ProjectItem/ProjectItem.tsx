import { Button, Image, Rate } from 'antd';
import { useIntl } from 'react-intl';
import { Project } from 'models/project';
import './ProjectItem.less';

interface IProps {
  data?: Project;
}

const ProjectItem = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();

  return <div className="projectItem">
  <div className="image">
    <img
      alt="logo"
      src={data?.images || '/images/no-image.png'}
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
</div>
}

export default ProjectItem;
