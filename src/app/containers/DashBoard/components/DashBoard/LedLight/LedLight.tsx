import { Empty, Spin } from 'antd';
import { Banner } from '../../Banner';
import './LedLight.less';
import { categoriesHooks } from 'app/containers/Admin/Category';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';

import { Context as AppContext } from 'app/context/appContext';
import { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import Search from 'antd/lib/input/Search';

const LedLight = (): JSX.Element => {
  const intl = useIntl();

  const { isMobile, orientation } = useContext(AppContext);
  const [name, setName] = useState('');

  const { data: categories, isSuccess } = categoriesHooks.useCategories({
    search: {
      type: 'den-led',
      name: name || undefined,

    },
    pagination: {
      limit: 3,
      offset: 0,
    },
  });

  const onSearch = (value: string) => setName(value);


  return (
    <div
      className={`led-light ${isMobile && 'led-light-mobile'} ${
        orientation && `led-light-mobile-${orientation}`
      }`}
    >
      {!isMobile && <Banner image="/images/led-light-banner.png" />}
      <h1 className="pageTitle">{intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' })}</h1>
      <Search
        className="search"
        addonBefore={intl.formatMessage({ id: 'common.search.title' })}
        placeholder={intl.formatMessage({ id: 'common.search.placeholder' })}
        onSearch={onSearch}
      />
      <Spin spinning={!isSuccess}>
        <div className="items">
          {categories?.data && categories?.data.length > 0 ? (
            categories?.data?.map((item: Category) => <CategoryItem data={item} key={Math.random()} />)
          ) : (
            <Empty description={intl.formatMessage({ id: 'common.empty.data' })} />
          )}
        </div>
      </Spin>
    </div>

    // <Layout className='led-light'>
    //   <Header className="header">
    //     <TemplateHeader />
    //   </Header>
    //   <Content style={{ padding: '0 50px' }}>
    //     <Banner image='/images/led-light-banner.png'/>
    //     <div className='items'>
    //       {categories && categories?.data?.map((item: Category) => <CategoryItem key={Math.random()} data={item} />)}
    //     </div>
    //   </Content>
    //   <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
    //     <TemplateFooter />
    //   </Footer>
    // </Layout>
  );
};

export default LedLight;
