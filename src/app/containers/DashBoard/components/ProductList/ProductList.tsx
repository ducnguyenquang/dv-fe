import { Spin } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import { ProductItem } from './components/ProductItem';
import './ProductList.less';
import { isMobile } from 'react-device-detect';
import { useMemo, useContext } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import Marquee from "react-fast-marquee";

const ProductList = (): JSX.Element => {
  const intl = useIntl();
  const { orientation } = useContext(AppContext);

  const { data: products, isSuccess } = productsHooks.useProducts({
    pagination: {
      limit: 10,
      offset: 0,
    },
    search: {
      isHidden: false,
    }
  });

  return (
    <div className={`product ${isMobile && 'product-mobile'} ${isMobile && orientation && `product-mobile-${orientation}`}`}>
      <div className="header">{intl.formatMessage({ id: 'page.name.product' })}</div>
      <Spin spinning={!isSuccess}>
        <div className="productBlock">
          <Marquee pauseOnHover={true} speed={15}>
            {products?.data?.map((data: Product) => {
              return <ProductItem data={data} key={Math.random()} />;
            })}
          </Marquee>
        </div>
      </Spin>
    </div>
  );
};

export default ProductList;
