import { Button, Collapse } from 'antd';
import { ProductFilters } from 'models/product';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsSelectors } from '../..';
import { BrandFilter } from './components/BrandFilter';
import { LedAttributeFilter } from './components/LedAttributeFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { TypeFilter } from './components/TypeFilter';

import './ProductFilter.less';
interface IProps {
  extendChildren?: any;
}

const ProductFilter = ({extendChildren}: IProps): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const productFilter = useSelector(productsSelectors.getFilters);

  // const [filters, setFilters] = React.useState<ProductFiltersId>();
  const [filters, setFilters] = useState<ProductFilters>();
  const [isShowLedAttribute, setIsShowLedAttribute] = useState(false);

  const onTypeSelected = useCallback(
    (types: string[]) => {
      const data = types.map(item => JSON.parse(item));
      setFilters({
        ...filters,
        types: data ? data : undefined,
        categories: undefined,
        ledAttributes: undefined,
      });
      const isShowLedAttribute = data?.filter(item => /den\-led/gi.test(item._id));
      setIsShowLedAttribute(isShowLedAttribute.length > 0);
    },
    [filters]
  );

  const onBrandSelected = useCallback(
    (brands: string[]) => {
      const data = brands.map(item => JSON.parse(item));
      setFilters({
        ...filters,
        brands: data ? data : undefined,
      });
    },
    [filters]
  );

  const onCategoySelected = useCallback(
    (categories: string[]) => {
      const data = categories.map(item => JSON.parse(item));
      setFilters({
        ...filters,
        categories: data ? data : undefined,
      });
    },
    [filters]
  );

  const onLedAttributeSelected = useCallback(
    (ledAttributes: string[]) => {
      const data = ledAttributes.map(item => JSON.parse(item));

      setFilters({
        ...filters,
        ledAttributes: data ? data : undefined,
      });
    },
    [filters]
  );

  useEffect(() => {
    if (productFilter) {
      const isShowLedAttribute: any = productFilter?.types?.filter(item => /den\-led/gi.test(item._id));

      setFilters(productFilter);
      setIsShowLedAttribute(isShowLedAttribute?.length > 0);
    }
  }, [productFilter]);

  const onApply = useCallback(() => {
    dispatch(productsActions.setFiltersApply(filters));
    dispatch(productsActions.setFilters(filters));
  }, [dispatch, filters]);

  const onReset = useCallback(() => {
    dispatch(productsActions.setFilters(undefined));
    dispatch(productsActions.setFiltersApply(undefined));
    setFilters(undefined);
  }, [dispatch]);

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
          <CategoryFilter onCategorySelected={onCategoySelected} filters={filters}/>
        </Collapse.Panel>
        {isShowLedAttribute && (
          <Collapse.Panel
            header={intl.formatMessage({ id: 'template.leftMenu.ledAttributeFilter.title' })}
            key="ledAttribute"
          >
            <LedAttributeFilter onLedAttributeSelected={onLedAttributeSelected} defaultValue={filters?.ledAttributes} />
          </Collapse.Panel>
        )}
      </Collapse>
      <div className="filters">
        <Button type="primary" onClick={onApply} disabled={!!filters === false}>
          {intl.formatMessage({ id: 'common.button.apply' })}
        </Button>
        <Button type="ghost" onClick={onReset}>
          {intl.formatMessage({ id: 'common.button.cancel' })}
        </Button>
      </div>
      {extendChildren}
    </div>
  );
};

export default ProductFilter;
