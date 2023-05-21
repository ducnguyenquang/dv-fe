import { Image } from 'antd';
import './PopupMenuItem.less';
import { PopupMenu } from 'models/popupMenu';
import { Link } from 'react-router-dom';

interface IProps {
  data?: PopupMenu;
}

const PopupMenuItem = ({ data }: IProps): JSX.Element => {
  const url = data?.url as string;

  return (
    <div className="popupMenuItem">
      {data?.images && data?.images.length > 0 && (
        <Image
          wrapperClassName="popupMenuItem-image"
          preview={false}
          src={data?.images?.[0]?.url || data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
          className="image"
        />
      )}
      {!url.includes('http') ? (
        <Link className="popupMenuItem-name" to={data?.url as string}>
          {data?.name}
        </Link>
      ) : (
        <a className="popupMenuItem-name" href={url}>
          {data?.name}
        </a>
      )}
    </div>
  );
};

export default PopupMenuItem;
