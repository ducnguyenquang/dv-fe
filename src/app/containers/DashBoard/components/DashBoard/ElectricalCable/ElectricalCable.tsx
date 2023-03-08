import { Empty, Spin } from 'antd';
import { Banner } from '../../Banner';
import './ElectricalCable.less';
import { categoriesHooks } from 'app/containers/Admin/Category';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';
import Search from 'antd/lib/input/Search';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const ElectricalCable = (): JSX.Element => {
  const intl = useIntl();

  const { isMobile, orientation } = useContext(AppContext);

  const [name, setName] = useState('');
  const { data: categories, isSuccess } = categoriesHooks.useCategories({
    search: {
      type: 'cap-dien',
      name: name || undefined,
    },
    pagination: {
      limit: 100000,
      offset: 0,
    },
  });

  const onSearch = (value: string) => setName(value);

  return (
    <div
      className={`electrical-cable ${isMobile && 'electrical-cable-mobile'} ${
        isMobile && orientation && `electrical-cable-mobile-${orientation}`
      }`}
    >
      {!isMobile && <Banner image="/images/eletrical-cable-banner.png" />}
      <h1 className="pageTitle">{intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' })}</h1>
      <Search
        className="search"
        addonBefore={intl.formatMessage({ id: 'common.search.title' })}
        placeholder={intl.formatMessage({ id: 'common.search.placeholder' })}
        onSearch={onSearch}
      />
      <Spin spinning={!isSuccess}>
        <div className="categories">
          {categories?.data && categories?.data.length > 0 ? (
            categories?.data?.map((item: Category) => <CategoryItem data={item} key={Math.random()} />)
          ) : (
            <Empty description={intl.formatMessage({ id: 'common.empty.data' })} />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ElectricalCable;
