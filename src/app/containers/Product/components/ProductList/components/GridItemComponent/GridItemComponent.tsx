import { Row, Col, Avatar, List, Space, Rate, Button, Card } from 'antd';
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Product } from 'models/product';
import Meta from 'antd/lib/card/Meta';
import { useIntl } from 'react-intl';
import './GridItemComponent.less';

interface IProps {
  data: Product;
}

const GridItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();

  // const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  //   <Space>
  //     {React.createElement(icon)}
  //     {text}
  //   </Space>
  // );

  // console.log('==== ProductListItem data', data);

  // const goToProductDetail = () => {
  //   window.location.href = `/product/${data?.slug}`;
  // };

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
              onClick={() => (window.location.href = `/product/${encodeURIComponent(data?.slug as string)}`)}
            >
              {intl.formatMessage({ id: 'common.button.detail' })}
            </Button>
            {/* <Button className='favouriteButton' type="ghost">{intl.formatMessage({ id: 'common.button.favourite' })}</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItemComponent;
