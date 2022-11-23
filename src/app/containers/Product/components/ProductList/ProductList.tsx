import { Divider, Skeleton, Segmented, Pagination } from 'antd';
import React, { useCallback } from 'react';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import './ProductList.less';
import { ListComponent } from './components';
import { productsHooks, productsSelectors } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Product } from 'models/product';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl, FormattedMessage } from 'react-intl';
import { FilterApplied } from '../ProductFilter/components/FilterApplied';
import { useSelector } from 'react-redux';
import { Brand } from 'models/brand';
import { Category } from 'models/category';

const ProductList = (): JSX.Element => {
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [viewType, setViewType] = React.useState('list');
  const [search, setSearch] = React.useState();
  const productFilter = useSelector(productsSelectors.getFilters);
  const [isLoadMoreData, setIsLoadMoreData] = React.useState(false);

  const [productPagination, setProductPagination] = React.useState<{
    totalCount?: number;
    offset?: number;
    hasNextPage?: boolean;
    limit?: number;
  }>({});
  const intl = useIntl();

  const { data: productData, isLoading: isProductDataLoading } = productsHooks.useProducts({
    search,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  useEffect(() => {
    if (productData && !isProductDataLoading) {
      // if (isLoadMoreData) {
      //   setIsLoadMoreData(false);
      //   setProducts([...products, ...productData?.data]);
      // } else {
        setProducts(productData?.data);
      // }
      setProductPagination(productData?.pagination);
    }
  }, [productData, isProductDataLoading, products, isLoadMoreData]);

  useEffect(() => {
    if (productFilter) {
      let searchData: any = {};
      // if (searchData) {
      // searchData[dataIndex] = selectedKeys?.[0];
      for (const [key, value] of Object.entries(productFilter)) {
        if (value) {
          switch (key) {
            case 'categories':
              // searchData['categories'] = (value as Category[]).map((item: any) => item._id).join('|')
              searchData['categories'] = (value as Category[]).map((item: any) => item._id);
              break;
            case 'brands':
              // searchData['brand'] = (value as Brand[]).map((item: any) => item._id).join('|')
              searchData['brand'] = (value as Brand[]).map((item: any) => item._id);
              break;
            default:
              break;
          }
        }
        // console.log(`${key}: ${value}`);
      }
      console.log('==== searchData', searchData);
      setSearch(searchData);
    }
  }, [productFilter]);

  const loadMoreData = () => {
    // console.log('==== loadMoreData page + 1', page + 1);
    setPage(page + 1);
    setIsLoadMoreData(true);
  };

  return (
    <div className="productList">
      <FilterApplied />
      <div className="modeBlock">
        <div className="numberItem">
          <span>{productPagination.totalCount}</span>
          <FormattedMessage id="common.filter.product" />
        </div>
        <Segmented
          className="modeFilter"
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
      </div>
      <div
        id="scrollableDiv"
        style={{
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={products?.length}
          next={loadMoreData}
          hasMore={productPagination && productPagination?.hasNextPage ? productPagination?.hasNextPage : false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain></Divider>}
          scrollableTarget="scrollableDiv"
          height={610}
          style={{ padding: '10px' }}
        >
          <ListComponent products={products} viewType={viewType} />
        </InfiniteScroll>
      </div>
      <Pagination
        className='pagination'
        total={productData?.pagination?.totalCount || 10}
        showTotal={(total, range) => {
          return intl.formatMessage(
            { id: 'common.pagination.rangeData' },
            { 
              start: range[0] || 1,
              end: range[1] || productData?.pagination?.pageSize,
              total,
            }
          )
        }}
        defaultPageSize={productData?.pagination?.pageSize}
        current={page}
        onChange={(page, pageSize) =>
          setPage(page)
        }
        showSizeChanger
        onShowSizeChange={(pageSize) => productData?.pagination?.onShowSizeChange?.(pageSize)}
      />
    </div>
  );
};

export default ProductList;
