import { Row, Col, Avatar, List, Space, Rate, Button } from 'antd';
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import './ListItemComponent.less';
interface IProps {
  data: Product;
}

const ListItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // console.log('==== ProductListItem data', data);

  const goToProductDetail = () => {
    window.location.href = data?.slug ? `/product/${encodeURIComponent(data?.slug)}` : '';
  };

  return (
    <div className="listItem" onClick={goToProductDetail}>
      <div className="image">
        <img
          width={272}
          alt="logo"
          src={data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
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
          <div className="extraData">
            <div className="brand">
              {data?.brand && `${intl.formatMessage({ id: 'product.brand' })}:  ${data?.brand?.name}`}
            </div>
            <div className="category">
              {data?.categories &&
                `${intl.formatMessage({ id: 'product.categories' })}:  ${data?.categories
                  ?.map(item => item.name)
                  .join(', ')}`}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
          <div className="action">
            <Button
              className="detailButton"
              type="primary"
              onClick={() => (window.location.href = `/product/${encodeURIComponent(data?.slug as string)}`)}
            >
              {intl.formatMessage({ id: 'common.button.detail' })}
            </Button>
            <Button className="favouriteButton" type="ghost">
              {intl.formatMessage({ id: 'common.button.favourite' })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemComponent;
