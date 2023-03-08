import { List } from 'antd';
import { Product } from 'models/product';
// import Sider from 'antd/lib/layout/Sider';
// import React, { useState } from 'react';
// import { useIntl } from 'react-intl';
import { GridItemComponent } from '../GridItemComponent';
import './GridComponent.less';

interface IProps {
  products: Product[];
}

const GridComponent = ({ products }: IProps): JSX.Element => {
  // const intl = useIntl();
  
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      className="productGridList"
      // itemLayout="vertical"
      size="large"
      // dataSource={products}
      renderItem={(item: Product) => <GridItemComponent data={item} />}
    />
  );
};

export default GridComponent;
