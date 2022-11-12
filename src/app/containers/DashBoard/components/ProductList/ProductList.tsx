import { Carousel } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import { ProductItem } from './components/ProductItem';
import './ProductList.less';

const ProductList = (): JSX.Element => {
  const intl = useIntl();

  const { data: products, isLoading } = productsHooks.useProducts({
    pagination: {
      limit: 3,
      offset: 0,
    },
  });

  return (
    <div className="product">
      <div className="header">{intl.formatMessage({ id: 'page.name.product' })}</div>
      <div className="productBlock">
        {products?.data?.map((data: Product) => {
          return <ProductItem data={data} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
