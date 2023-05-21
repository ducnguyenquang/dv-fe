import { Rate, Button, Tooltip } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Project } from 'models/project';
import { useIntl } from 'react-intl';
import './ListItemComponent.less';
import { useNavigate } from 'react-router-dom';
interface IProps {
  data: Project;
}

const ListItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const goToProjectDetail = () => {
    navigate(data?.slug ? `/project/${encodeURIComponent(data?.slug)}` : '/projects')
  };


  return (
    <div className="listItem" onClick={goToProjectDetail}>
      <div className="image">
        <img
          width={272}
          alt="logo"
          src={data?.images?.[0]?.url || data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
          onError={error => {
            error.currentTarget.src = '/images/no-image.png';
            error.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className="content">
        <div className="leftSide">
          <div className="information">
            <div className="title">{data?.name}</div>
            <div className="description">{data?.summary}</div>
            <div className="rate">
              <Rate disabled defaultValue={4} />
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
          <div className="action">
            <Tooltip title={intl.formatMessage({ id: 'common.button.favourite' })}>
              <Button type="link" shape="circle" icon={<HeartOutlined />} size="large" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemComponent;
