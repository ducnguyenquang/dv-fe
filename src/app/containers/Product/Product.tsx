
// import { EquipmentsTable } from 'Components/Equipments';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { productsHooks } from './hooks';

const Product = (): JSX.Element => {
  // TODO: remove after MVP
//   const path = useLocation();
//   const currentPathName = path?.pathname?.split('/')?.pop();
//   const showEquipmentReports = currentPathName === 'equipments-reports';
  // const debouncedFilters = useDebounce(filters);

  const { data, isLoading, isFetching } = productsHooks.useProducts({
    // ...debouncedFilters,
    pagination: {
      limit: 10,
      offset: 0,
    },
    // sort: sortBy[0],
  });

  console.log('==== data', data)
  return (
    <div className={cx('company-equipments')}>
      <h1 className="page-title page-main-title heading1">
        Product page
      </h1>
      {/* <EquipmentsTable /> */}
    </div>
  );
};

export default Product;
