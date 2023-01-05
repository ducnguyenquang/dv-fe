import { Layout, Modal } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { Header as TemplateHeader } from '../../../../Template/components/Template/components/Header';
import { Footer as TemplateFooter } from '../../../../Template/components/Template/components/Footer';
import { Banner } from '../../Banner';
import { Construction } from '../../Construction';
import { Faq } from '../../Faq';
import { Information } from '../../Information';
import { ProductList } from '../../ProductList';
import { Projects } from '../../Projects';
import { Vision } from '../../Vision';
import { PopupMenus } from '../../PopupMenus';

const HomePage = (): JSX.Element => {
  return (
    <Layout>
      <Header className="header">
        {/* <Menu className='topMenu' mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
        <TemplateHeader />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Banner image='/images/banner_slider_1-9340.png'/>
        <Vision />
        <Information />
        <ProductList />
        <Construction />
        <Faq />
        <Projects />
        {/* <PopupMenus /> */}
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter />
      </Footer>
    </Layout>
  );
};

export default HomePage;
