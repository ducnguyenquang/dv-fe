import { Button, Image, Rate } from 'antd';
import { useIntl } from 'react-intl';
import './PopupMenuItem.less';
import { PopupMenu } from 'models/popupMenu';

interface IProps {
  data?: PopupMenu;
}

const PopupMenuItem = ({ data }: IProps): JSX.Element => {
  return <div className="popupMenuItem">
    <Image preview={false} src={data?.images?.[0]?.url || data?.images?.[0]?.thumbUrl || '/images/no-image.png'} className="image" />

    <a href={data?.url}>{data?.name}</a>
  </div>;
};

export default PopupMenuItem;
