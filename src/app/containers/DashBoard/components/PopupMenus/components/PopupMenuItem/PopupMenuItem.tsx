import { Button, Image, Rate } from 'antd';
import { useIntl } from 'react-intl';
import './PopupMenuItem.less';
import { PopupMenu } from 'models/popupMenu';

interface IProps {
  data?: PopupMenu;
}

const PopupMenuItem = ({ data }: IProps): JSX.Element => {
  return <div className="popupMenuItem">
    <a href={data?.url}>{data?.name}</a>
  </div>;
};

export default PopupMenuItem;
