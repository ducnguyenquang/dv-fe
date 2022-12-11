import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Header as TemplateHeader } from '../../../../Template/components/Template/components/Header';
import { Footer as TemplateFooter } from '../../../../Template/components/Template/components/Footer';
import { Banner } from '../../Banner';
import './LedLight.less';
import { categoriesHooks } from 'app/containers/Admin/Category';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';


const LedLight = (): JSX.Element => {
  const { data: categories, isSuccess } = categoriesHooks.useCategories({
    search: {
      type: 'den-led'
    },
    pagination: {
      limit: 3,
      offset: 0,
    },
  });

  return (
    <Layout className='led-light'>
      <Header className="header">
        <TemplateHeader />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Banner image='/images/led-light-banner.png'/>
        {categories && categories?.data?.map((item: Category) => <CategoryItem key={Math.random()} data={item} />)}
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter />
      </Footer>
    </Layout>
  );
};

export default LedLight;
