import { Spin } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import { ProductItem } from './components/ProductItem';
import './ProductList.less';

const ProductList = (): JSX.Element => {
  const intl = useIntl();

  const { data: products, isSuccess } = productsHooks.useProducts({
    pagination: {
      limit: 3,
      offset: 0,
    },
  });

  return (
    <div className="product">
      <div className="header">{intl.formatMessage({ id: 'page.name.product' })}</div>
      <Spin spinning={!isSuccess}>
        <div className="productBlock">
          {products?.data?.map((data: Product) => {
            return <ProductItem data={data} key={Math.random()} />;
          })}
        </div>
      </Spin>
    </div>
  );
};

export default ProductList;
