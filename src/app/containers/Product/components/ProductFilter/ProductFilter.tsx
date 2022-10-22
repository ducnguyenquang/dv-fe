import { Button } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ProductFilters, RangeNumber } from 'models/product';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsSelectors } from '../..';
import { BrandFilter } from './components/BrandFilter';
import { PricingFilter } from './components/PricingFilter';
import { ReviewFilter } from './components/ReviewFilter';
import './ProductFilter.less';

const ProductFilter = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const productFilter = useSelector(productsSelectors.getFilters);

  const [filters, setFilters] = React.useState<ProductFilters>(productFilter);

  const onBrandSelected = useCallback(
    (brands: string[]) => {
      setFilters({
        ...filters,
        brands,
      });
    },
    [filters]
  );

  const onReviewSelected = useCallback(
    (review: number) => {
      setFilters({
        ...filters,
        review,
      });
    },
    [filters]
  );

  const onPricingSelected = useCallback(
    (pricing: number[]) => {
      setFilters({
        ...filters,
        pricing,
      });
    },
    [filters]
  );

  useEffect(() => {
    // if (productFilter) {
      setFilters(productFilter)
    // }
  }, [productFilter]);

  const onApply = useCallback(() => {
    dispatch(productsActions.setFilters(filters));
  }, [dispatch, filters]);

  const onReset = useCallback(() => {
    // console.log('==== onReset filters', filters);

    dispatch(productsActions.setFilters(undefined));
    // setFilters(undefined)
  }, [dispatch]);

  console.log('==== productFilter', productFilter);
  return (
    <div className="productFilter">
      <div className="filters">
        <BrandFilter onBrandSelected={onBrandSelected} defaultValue={filters?.brands}/>
      </div>
      <div className="filters">
        <ReviewFilter onReviewSelected={onReviewSelected} defaultValue={filters?.review} />
      </div>
      <div className="filters">
        <PricingFilter onPricingSelected={onPricingSelected} defaultValue={filters?.pricing}/>
      </div>
      <div className="filters">
        <Button type="primary" onClick={onApply} disabled={!filters}>
          {intl.formatMessage({ id: 'common.button.apply' })}
        </Button>
        <Button type="ghost" onClick={onReset}>
          {intl.formatMessage({ id: 'common.button.cancel' })}
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
