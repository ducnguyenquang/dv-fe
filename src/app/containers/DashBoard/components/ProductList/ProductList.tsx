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

  const threeProductFirst = useMemo(() => {
    const size = 5;
    return products?.data.slice(0, size).map((data: Product) => {
      return <ProductItem data={data} key={Math.random()} />;
    });
  }, [products?.data]);

  return (
    <div className={`product ${isMobile && 'product-mobile'} ${orientation && `product-mobile-${orientation}`}`}>
      <div className="header">{intl.formatMessage({ id: 'page.name.product' })}</div>
      <Spin spinning={!isSuccess}>
        <div className="productBlock">
          <Marquee loop={1000} pauseOnHover={true}>
            {products?.data?.map((data: Product) => {
              return <ProductItem data={data} key={Math.random()} />;
            })}
          </Marquee>
          {/* <div className="animationProductBlock">
            {products?.data?.map((data: Product) => {
              return <ProductItem data={data} key={Math.random()} />;
            })}
            {threeProductFirst}
          </div> */}
        </div>
      </Spin>
    </div>
  );
};

export default ProductList;
