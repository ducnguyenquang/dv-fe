import { Button, Image, Rate } from 'antd';
import { useIntl } from 'react-intl';
import './PopupMenuItem.less';
import { PopupMenu } from 'models/popupMenu';
import { Link } from 'react-router-dom';

interface IProps {
  data?: PopupMenu;
}

const PopupMenuItem = ({ data }: IProps): JSX.Element => {
  return <div className="popupMenuItem">
    <Image wrapperClassName='popupMenuItem-image' preview={false} src={data?.images?.[0]?.url || data?.images?.[0]?.thumbUrl || '/images/no-image.png'} className="image" />
    <Link className='popupMenuItem-name' to={data?.url as string}>{data?.name}</Link>
  </div>;
};

export default PopupMenuItem;
