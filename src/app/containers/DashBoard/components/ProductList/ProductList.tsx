import { Spin } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import { ProductItem } from './components/ProductItem';
import './ProductList.less';
import { isMobile } from 'react-device-detect';
import { useContext, useState } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import Marquee from "react-fast-marquee";

const ProductList = ({productNames}: {productNames: string}): JSX.Element => {
  const intl = useIntl();
  const { orientation } = useContext(AppContext);

  const [search, setSearch] = useState<any>({
    isHidden: false,
    name: productNames,
  });

  const { data: products, isSuccess } = productsHooks.useProducts({
    pagination: {
      limit: 10,
      offset: 0,
    },
    search
  });

  return (
    <div className={`product ${isMobile && 'product-mobile'} ${isMobile && orientation && `product-mobile-${orientation}`}`}>
      <div className="header">{intl.formatMessage({ id: 'page.name.product' })}</div>
      <Spin spinning={!isSuccess}>
        {products && <div className="productBlock">
          <Marquee className='marquee-text' pauseOnHover={true} speed={15} loop={100}>
            {products?.data?.map((data: Product) => {
              return <ProductItem data={data} key={Math.random()} />;
            })}
          </Marquee>
        </div>}
      </Spin>
    </div>
  );
};

export default ProductList;
