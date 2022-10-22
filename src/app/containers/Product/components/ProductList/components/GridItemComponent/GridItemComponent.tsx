import { Row, Col, Avatar, List, Space, Rate, Button, Card } from 'antd';
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Product } from 'models/product';
import Meta from 'antd/lib/card/Meta';

interface IProps {
  data: Product;
}

const GridItemComponent = ({ data }: IProps): JSX.Element => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  console.log('==== ProductListItem data', data)

  const goToProductDetail = () => {
    window.location.href = `/product/${data?.slug}`
  }

  return (
    <Card 
      title={data.name}
      style={{ width: 240 }}
      cover={<img alt="example" src={data?.images?.[0]?.thumbUrl} />}
    ><Meta title={data?.name} description={<>{data?.slug}<br /><Rate /></>} /></Card>
  );
};

export default GridItemComponent;
