import { Rate, Button } from 'antd';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import './GridItemComponent.less';
import { useNavigate, Link } from 'react-router-dom';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

interface IProps {
  data: Product;
}

const GridItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { isMobile } = useContext(AppContext);

  const goToProductDetail = (slug: string) => {
    navigate(`/product/${encodeURIComponent(slug)}`);
  };

  const productId = encodeURIComponent(data?.slug as string)

  return (
    <Link to={`/product/${productId}`}>
      <div
        className={`gridItem ${isMobile && 'gridItem-mobile'}`}
        // onClick={() => (isMobile ? goToProductDetail(data?.slug as string) : undefined)}
      >
        <div className="image">
          <img
            alt="logo"
            src={data?.images?.[0]?.url || data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
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
            {/* <div className="rate">
            <Rate disabled defaultValue={4} />
          </div> */}
          </div>
          <div className="bottomSide">
            <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
            {!isMobile && (
              <div className="action">
                <Button type="primary" className="detailButton" onClick={() => goToProductDetail(productId)}>
                  {intl.formatMessage({ id: 'common.button.detail' })}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GridItemComponent;
