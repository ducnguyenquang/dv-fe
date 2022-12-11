import { Button } from 'antd';
import { productsActions, productsSelectors } from 'app/containers/Product';
// import Sider from 'antd/lib/layout/Sider';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import './FilterApplied.less';

const FilterApplied = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const productFilter = useSelector(productsSelectors.getFiltersApply);

  const onReset = useCallback(() => {
    dispatch(productsActions.setFilters(undefined));
    dispatch(productsActions.setFiltersApply(undefined));
  }, [dispatch]);

  const renderFilter = () => {
    const allFilters = [];
    if (productFilter) {
      for (const [key, value] of Object.entries(productFilter)) {
        if (value) {
          allFilters.push(
            <div className="filter">
              <div className="title">{intl.formatMessage({ id: `filter.${key}` })}</div>
              <div className="items">
                <div>{typeof value === 'object' ? value.map(item => item.name || item.label).join(', ') : value}</div>
              </div>
            </div>
          );
        }
      }
    }
    return allFilters;
  };

  return (
    productFilter && (
      <div className="filterApplied">
        <h1>
          {intl.formatMessage({ id: 'filter.title' })}:
          <Button type="ghost" onClick={onReset}>
            {intl.formatMessage({ id: 'common.button.cancel' })}
          </Button>
        </h1>
        <div className="filterBlock">{renderFilter()}</div>
      </div>
    )
  );
};

export default FilterApplied;
