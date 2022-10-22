import { List } from 'antd';
import { Product } from 'models/product';
// import Sider from 'antd/lib/layout/Sider';
// import React, { useState } from 'react';
// import { useIntl } from 'react-intl';
import { ListItemComponent } from '../ListItemComponent';
import './ListComponent.less';

interface IProps {
  products: Product[];
  viewType: string;
}

const ListComponent = ({ products, viewType }: IProps): JSX.Element => {
  // const intl = useIntl();
  const attributes = {
    // itemLayout: 'vertical',
    // dataSource: products,
    // size: viewType === 'list' ? "large" : undefined,
    grid: viewType === 'grid' ? {
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }: undefined,
  }
  return (
    <List
      className="productList"
      itemLayout="vertical"
      size="large"
      dataSource={products}
      renderItem={(item: Product) => <ListItemComponent data={item} />}
      {...attributes}
    />
  );
};

export default ListComponent;
