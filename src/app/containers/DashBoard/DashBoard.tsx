import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Banner } from './components/Banner'
import { Header as TemplateHeader } from '../Template/components/Template/components/Header';
import { Vision } from './components/Vision';
import { Information } from './components/Information';

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
  </Content>
  <Footer style={{ textAlign: 'center', fontSize: '13px' }}>Copyright © {new Date().getFullYear()} Công ty Cổ phần chiếu sáng & Thiết bị điện Đại Việt. All rights reserved.</Footer>
</Layout>
}

export default DashBoard;
