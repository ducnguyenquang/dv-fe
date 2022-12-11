import { Button, Image, Rate } from 'antd';
import { useIntl } from 'react-intl';
import { Product } from 'models/product';
import './ProductItem.less';

interface IProps {
  data?: Product;
}

const ProductItem = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();

  return <div className="productItem">
  <div className="image">
    <img
      alt="logo"
      src={data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
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
    <div className="bottomSide">
      <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
      <div className="action">
        <Button
          type="link"
          className="detailButton"
          onClick={() => (window.location.href = `/product/${encodeURIComponent(data?.slug as string)}`)}
        >
          {intl.formatMessage({ id: 'common.button.detail' })}
        </Button>
      </div>
    </div>
  </div>
</div>
}

export default ProductItem;
