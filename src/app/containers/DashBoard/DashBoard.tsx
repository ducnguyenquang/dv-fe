import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Banner } from './components/Banner'
import { Header as TemplateHeader } from '../Template/components/Template/components/Header';
import { Footer as TemplateFooter } from '../Template/components/Template/components/Footer';

import { Vision } from './components/Vision';
import { Information } from './components/Information';
import { Construction } from './components/Construction';
import { Faq } from './components/Faq';


const DashBoard = (): JSX.Element => {
  return <Layout>
  <Header className="header">
    {/* <Menu className='topMenu' mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    <TemplateHeader />
  </Header>
  <Content style={{ padding: '0 50px' }}>
    <Banner />
    <Vision />
    <Information />
    <Construction />
    <Faq />
  </Content>
  <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
    <TemplateFooter />
  </Footer>
</Layout>
}

export default DashBoard;
