import { Layout, Spin } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Header as TemplateHeader } from '../../../../Template/components/Template/components/Header';
import { Footer as TemplateFooter } from '../../../../Template/components/Template/components/Footer';
import { Banner } from '../../Banner';
import './ElectricalCable.less';
import { categoriesHooks } from 'app/containers/Admin/Category';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';

const ElectricalCable = (): JSX.Element => {
  const { data: categories, isSuccess } = categoriesHooks.useCategories({
    search: {
      type: 'cap-dien',
    },
    pagination: {
      limit: 100000,
      offset: 0,
    },
  });
  // console.log('==== categories', categories);

  return (
    <Layout className="electrical-cable">
      <Header className="header">
        <TemplateHeader />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Banner image="/images/eletrical-cable-banner.png" />
        <div className="electrical-cables">
          <Spin spinning={!isSuccess}>
            {categories && categories?.data?.map((item: Category) => <CategoryItem data={item} key={Math.random()} />)}
          </Spin>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter />
      </Footer>
    </Layout>
  );
};

export default ElectricalCable;
