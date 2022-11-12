import { Button, Collapse } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ProductFilters, RangeNumber } from 'models/product';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsSelectors } from '../..';
import { BrandFilter } from './components/BrandFilter';
import { LedAttributeFilter } from './components/LedAttributeFilter';
// import { PricingFilter } from './components/PricingFilter';
// import { ReviewFilter } from './components/ReviewFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { TypeFilter } from './components/TypeFilter';

import './ProductFilter.less';
import { Category } from 'models/category';
import { Brand } from 'models/brand';

const ProductFilter = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const productFilter = useSelector(productsSelectors.getFilters);

  const [filters, setFilters] = React.useState<ProductFilters>();

  const onTypeSelected = useCallback(
    (types: string[]) => {
      setFilters({
        ...filters,
        types,
        categories: undefined,
        ledAttributes: undefined,
      });
    },
    [filters]
  );

  const onBrandSelected = useCallback(
    (brands: string[]) => {
      setFilters({
        ...filters,
        brands,
      });
    },
    [filters]
  );

  const onCategoySelected = useCallback(
    (categories: string[]) => {
      setFilters({
        ...filters,
        categories,
      });
    },
    [filters]
  );

  const onLedAttributeSelected = useCallback(
    (ledAttributes: string[]) => {
      setFilters({
        ...filters,
        ledAttributes,
      });
    },
    [filters]
  );

  useEffect(() => {
    if (productFilter) {
      setFilters(productFilter);
    }
  }, [productFilter]);

  const onApply = useCallback(() => {
    dispatch(productsActions.setFilters(filters));
  }, [dispatch, filters]);

  const onReset = useCallback(() => {
    // console.log('==== onReset filters', filters);

    dispatch(productsActions.setFilters(undefined));
    setFilters(undefined)
  }, [dispatch]);

  console.log('==== filters', filters);
  return (
    <div className="productFilter">
      <Collapse>
        <Collapse.Panel header={intl.formatMessage({ id: 'template.leftMenu.brandFilter.title' })} key="brand">
          <BrandFilter onBrandSelected={onBrandSelected} defaultValue={filters?.brands} />
        </Collapse.Panel>
        <Collapse.Panel header={intl.formatMessage({ id: 'template.leftMenu.TypeFilter.title' })} key="type">
          <TypeFilter onTypeSelected={onTypeSelected} defaultValue={filters?.types} />
        </Collapse.Panel>
        <Collapse.Panel header={intl.formatMessage({ id: 'template.leftMenu.categoryFilter.title' })} key="category">
          <CategoryFilter onCategorySelected={onCategoySelected} filters={filters} />
        </Collapse.Panel>
        {filters?.types?.includes('den-led') && 
          <Collapse.Panel header={intl.formatMessage({ id: 'template.leftMenu.ledAttributeFilter.title' })} key="ledAttribute">
            <LedAttributeFilter onLedAttributeSelected={onLedAttributeSelected} defaultValue={filters?.ledAttributes} />
          </Collapse.Panel>
        }
      </Collapse>
      <div className="filters">
        <Button type="primary" onClick={onApply} disabled={!filters}>
          {intl.formatMessage({ id: 'common.button.apply' })}
        </Button>
        <Button type="ghost" onClick={onReset}>
          {intl.formatMessage({ id: 'common.button.cancel' })}
        </Button>
      </div>
    </div>
    // <div className="productFilter">
    //   <div className="filters">
    //     <TypeFilter onTypeSelected={onTypeSelected} defaultValue={filters?.types}/>
    //   </div>
    //   <div className="filters">
    //     <BrandFilter onBrandSelected={onBrandSelected} defaultValue={filters?.brands}/>
    //   </div>
    //   <div className="filters">
    //     <CategoryFilter onCategorySelected={onCategoySelected} defaultValue={filters?.categories}/>
    //   </div>
    //   <div className="filters">
    //     <ReviewFilter onReviewSelected={onReviewSelected} defaultValue={filters?.review} />
    //   </div>
    //   <div className="filters">
    //     <PricingFilter onPricingSelected={onPricingSelected} defaultValue={filters?.pricing}/>
    //   </div>
    //   <div className="filters">
    //     <Button type="primary" onClick={onApply} disabled={!filters}>
    //       {intl.formatMessage({ id: 'common.button.apply' })}
    //     </Button>
    //     <Button type="ghost" onClick={onReset}>
    //       {intl.formatMessage({ id: 'common.button.cancel' })}
    //     </Button>
    //   </div>
    // </div>
  );
};

export default ProductFilter;
