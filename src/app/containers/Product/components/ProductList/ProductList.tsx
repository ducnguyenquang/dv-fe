import { Row, Col, Avatar, List, Space, Divider, Skeleton, Segmented } from 'antd';
import React, { useCallback } from 'react';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import './ProductList.less';
import { ProductListItem } from './components/ProductListItem';
import { productsHooks, productsActions, productsApi, productsSelectors } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Product } from 'models/product';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';


const ProductList = (): JSX.Element => {
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [viewType, setViewType] = React.useState('list');
  const [productPagination, setProductPagination] = React.useState<{
    totalCount?: number, offset?: number, hasNextPage?: boolean, limit?: number
  }>({});
  const intl = useIntl();

//   const [productData, setProductData] = React.useState<any>();

  //   currentPage
//   const { totalCount, offset, hasNextPage, limit } = productPagination;
//   const products  = useSelector(productsSelectors.getProducts);

  console.log('==== page', page)
  console.log('==== pageSize', pageSize)
  const { data, isLoading } = productsHooks.useProducts({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

//   const getProductData = () => {
//     const data = productsHooks.useProducts({
//         pagination: {
//           limit: pageSize,
//           offset: page * pageSize,
//         },
//     });
//     // setProductData(data);
//     return data;
//   }
//   getProductData();
//   const { data, isLoading } = productData;

  useEffect(() => {
    if (data && !isLoading) {
      setProducts([...products, ...data?.data]);
      setProductPagination(data?.pagination);
    //   const { totalCount, offset, limit } = data?.pagination;
    //   setPageSize(limit)
    //   setPage(Math.ceil(totalCount / (offset + limit)));
      
        // console.log('==== offset', offset);
        // if (offset && limit) {

        //     setPage(Math.ceil(offset / totalCount));
        //     setPageSize(limit)
        // }
    }
  }, [data, isLoading]);

//   useEffect(() => {
//     if (offset && totalCount) {
//         // console.log('==== offset', offset);
//         // console.log('==== totalCount', totalCount);

//         setPageSize(limit)
//         setPage(Math.ceil(totalCount / (offset + limit)));

//         // const { data, isLoading } = productsHooks.useProducts({
//         //     pagination: {
//         //       limit: pageSize,
//         //       offset: page * pageSize,
//         //     },
//         //   });
//     }
//   }, [limit, offset, totalCount]);

//   console.log('==== page', page);

//   console.log('==== products', products);
  //   const data = Array.from({ length: 23 }).map((_, i) => ({
  //     href: 'https://ant.design',
  //     title: `ant design part ${i}`,
  //     avatar: 'https://joeschmoe.io/api/v1/random',
  //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //     content:
  //       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  //     image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  //   }));

  // const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  //     <Space>
  //       {React.createElement(icon)}
  //       {text}
  //     </Space>
  //   );

  //   const loadMoreData = useCallback(() => {
  //     setPage(page + 1);
  //   }, [page]);
  const loadMoreData = () => {
        // console.log('==== loadMoreData page', page);
        // console.log('==== loadMoreData offset', offset);
        // console.log('==== loadMoreData totalCount', totalCount);


    //   const nextPage = page + 1
    // const nextPage = Math.ceil((offset + pageSize) / totalCount)

    console.log('==== loadMoreData page + 1', page + 1);
    setPage(page + 1);
    // setPageSize(pageSize);

    // getProductData();

  };

  console.log('==== productPagination', productPagination);
  console.log('==== products', products);

  const viewTypeAttribute = {
    grid: viewType === 'grid' ? { gutter: 16, column: 3 } : undefined,
  };

  return (
    <>
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
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
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
          <List
            className="product-list"
            itemLayout="vertical"
            size="large"
            dataSource={products}
            renderItem={item => <ProductListItem data={item} />}
            {...viewTypeAttribute}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ProductList;
