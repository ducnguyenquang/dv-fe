import { Row, Col, Avatar, List, Space, Rate, Button } from 'antd';
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Product } from 'models/product';

interface IProps {
  data: Product;
}

const ListItemComponent = ({ data }: IProps): JSX.Element => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  console.log('==== ProductListItem data', data)

  const goToProductDetail = () => {
    window.location.href = data?.slug ? `/product/${encodeURIComponent(data?.slug)}` : ''
  }

  return (
    <List.Item
      key={data?.name}
    //   actions={[
    //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
    //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
    //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
    //   ]}
      extra={<img width={272} alt="logo" src={data?.images?.[0]?.thumbUrl} />}
    >
      <List.Item.Meta
        // avatar={<Avatar src={data?.avatar} />}
        title={<Button type='link' onClick={goToProductDetail}>{data?.name}</Button>}
        description={<>{data?.slug ? decodeURIComponent(data?.slug) : ''}<br /><Rate /></>}
      />
      {data?.summary}
    </List.Item>  
  );
};

export default ListItemComponent;
