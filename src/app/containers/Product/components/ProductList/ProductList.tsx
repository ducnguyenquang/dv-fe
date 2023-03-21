import { Divider, Skeleton, Segmented, Pagination } from 'antd';
import { useContext, useState } from 'react';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import './ProductList.less';
import { ListComponent } from './components';
import { productsHooks } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Product } from 'models/product';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl, FormattedMessage } from 'react-intl';
import { FilterApplied } from '../ProductFilter/components/FilterApplied';
import { useParams } from 'react-router-dom';
import { categoriesHooks } from 'app/containers/Admin/Category';
import { Context as AppContext } from 'app/context/appContext';

interface IProps {
  category?: string;
}

const ProductList = ({ category }: IProps): JSX.Element => {
  const [page, setPage] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewType, setViewType] = useState('list');
  const routeParams = useParams();
  const { isMobile } = useContext(AppContext);
  const defaultFilter = {
    category: { slug: routeParams.category},
  };
  const [search, setSearch] = useState<any>();
  const [isLoadMoreData, setIsLoadMoreData] = useState(false);
  
  const [productPagination, setProductPagination] = useState<{
    totalCount?: number;
    offset?: number;
    hasNextPage?: boolean;
    limit?: number;
  }>({});
  const intl = useIntl();

  const { data: categoryData, isLoading: isCategoryDataLoading } = categoriesHooks.useCategory({
    id: routeParams.category
  });

  useEffect(() => {
    if (categoryData && !isCategoryDataLoading && !search?.categories) {
      const categories = [categoryData?._id]
      setSearch({
        ...search,
        categories,
      })
    }
  },[categoryData, categoryData?._id, defaultFilter.category.slug, isCategoryDataLoading, search])
  
  const { data: productData, isLoading: isProductDataLoading } = productsHooks.useProducts({
    search,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });
  
  useEffect(() => {
    if (productData && !isProductDataLoading) {
      setProducts(productData?.data);
      setProductPagination(productData?.pagination);
    }
  }, [productData, isProductDataLoading, products, isLoadMoreData]);

  const loadMoreData = () => {
    setPage(page + 1);
    setIsLoadMoreData(true);
  };

  return (
    <div className={`productList ${isMobile && 'productList-mobile'}`}>
      <FilterApplied />
      {!isMobile && <div className="modeBlock">
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
      </div>}
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
          <ListComponent products={products} viewType={!isMobile ? viewType : 'grid'} />
        </InfiniteScroll>
      </div>
      <Pagination
        className="pagination"
        total={productData?.pagination?.totalCount || 10}
        showTotal={(total, range) => {
          return intl.formatMessage(
            { id: 'common.pagination.rangeData' },
            {
              start: range[0] || 1,
              end: range[1] || productData?.pagination?.pageSize,
              total,
            }
          );
        }}
        defaultPageSize={productData?.pagination?.pageSize}
        current={page}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
        onShowSizeChange={pageSize => {
          productData?.pagination?.onShowSizeChange?.(pageSize);
        }}
      />
    </div>
  );
};

export default ProductList;
