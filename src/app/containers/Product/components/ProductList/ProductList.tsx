import { Row, Col, Avatar, List, Space, Divider, Skeleton, Segmented } from 'antd';
import React, { useCallback } from 'react';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import './ProductList.less';
import { ListComponent } from './components';
import { productsHooks, productsActions, productsApi, productsSelectors } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Product } from 'models/product';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { FilterApplied } from '../ProductFilter/components/FilterApplied';


const ProductList = (): JSX.Element => {
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [viewType, setViewType] = React.useState('list');
  const [productPagination, setProductPagination] = React.useState<{
    totalCount?: number, offset?: number, hasNextPage?: boolean, limit?: number
  }>({});
  const intl = useIntl();
  
  const { data, isLoading } = productsHooks.useProducts({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });
  
  useEffect(() => {
    if (data && !isLoading) {
      setProducts([...products, ...data?.data]);
      setProductPagination(data?.pagination);
    }
  }, [data, isLoading]);

  const loadMoreData = () => {
    console.log('==== loadMoreData page + 1', page + 1);
    setPage(page + 1);
  };

  // const viewTypeAttribute = {
  //   grid: viewType === 'grid' ? { gutter: 16, xs: 1,
  //     sm: 2,
  //     md: 4,
  //     lg: 4,
  //     xl: 6,
  //     xxl: 3} : undefined,
  // };

  return (
    <>
    <FilterApplied />
      <Segmented
        onChange={value => setViewType(value as string)}
        options={[
          {
            label: intl.formatMessage({ id: 'common.button.filter.list' }),
            value: 'list',
            icon: <BarsOutlined />,
          },
          {
            label: intl.formatMessage({ id: 'common.button.filter.grid' }),
            value: 'grid',
            icon: <AppstoreOutlined />,
          },
        ]}
      />
      <div
        id="scrollableDiv"
        style={{
            // height: '600',
        //   height: 290 * productPagination?.totalCount,
          overflow: 'auto',
          // padding: '0 16px',
          // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
        //   dataLength={productPagination && productPagination?.totalCount ? productPagination?.totalCount : 0}
            dataLength={products?.length}

          next={loadMoreData}
          hasMore={productPagination && productPagination?.hasNextPage ? productPagination?.hasNextPage : true}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          height={610}
        //   scrollThreshold={270 * products?.length}
        >
          <ListComponent
            products={products}
            viewType={viewType}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ProductList;
