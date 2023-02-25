import { Rate, Button } from 'antd';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import './GridItemComponent.less';
import { useNavigate } from 'react-router-dom';

interface IProps {
  data: Product;
}

const GridItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div className="gridItem">
      <div className="image">
        <img
          width={236}
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
          <div className="rate">
            <Rate disabled defaultValue={4} />
          </div>
        </div>
        <div className="bottomSide">
          <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
          <div className="action">
            <Button
              type="primary"
              className="detailButton"
              onClick={() => navigate(`/product/${encodeURIComponent(data?.slug as string)}`)}
            >
              {intl.formatMessage({ id: 'common.button.detail' })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItemComponent;
