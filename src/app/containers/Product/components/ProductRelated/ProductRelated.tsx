import { Card } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Category } from 'models/category';
import { Product } from 'models/product';
import { Support } from 'models/support';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { GridItemComponent } from '../ProductList/components/GridItemComponent';
import './ProductRelated.less';

interface IProps {
  categories?: Category[];
}

const ProductRelated = ({ categories }: IProps): JSX.Element => {
  const intl = useIntl();
  const [page, setPage] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [products, setProducts] = useState<Product[]>([]);

  const { data: productData, isLoading: isLoadingProductData } = productsHooks.useProducts({
    search: {
      categories: categories?.map(item => item._id),
    },
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  useEffect(() => {
    if (productData && !isLoadingProductData) {
      setProducts(productData?.data);
    }
  }, [isLoadingProductData, productData]);

  return (
    <div className="productRelated">
      <div className="title">{intl.formatMessage({ id: 'product.related.title' })}</div>
      <div className="contentBlock">
        <div className="productContent">
          {products?.map(item => (
            <GridItemComponent key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRelated;
