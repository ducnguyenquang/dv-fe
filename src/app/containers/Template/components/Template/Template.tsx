import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Header as TemplateHeader } from './components/Header';
import { Footer as TemplateFooter } from './components/Footer';

import './Template.less';
import { BreadcrumbComponent } from '../BreadcrumbComponent';
import { Helmet } from 'react-helmet-async';
import { templatesHooks } from '../../hooks';
import { TagSeo } from 'models/tagSeo';

interface IProps {
  content?: any;
  leftMenu?: any;
}
const Template = ({ content, leftMenu }: IProps): JSX.Element => {
  const intl = useIntl();
  const [tagSeos, setTagSeos] = useState<string>();

  const navMenuClick = (url: string) => {
    window.location.href = url;
  };
  const { Header, Sider, Content } = Layout;

  const { data: dataTagSeos, isLoading: isLoadingTagSeos } = templatesHooks.useTagSeos({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultTagSeos = [
    'ĐẠI VIỆT',
    'DAI VIET',
    'Đại Việt',
    'Đại Việt',
    'Dai Viet',
    'đại việt',
    'dai viet',
    'Cadivi',
    'CADIVI',
    'CÁP ĐIỆN',
    'CAP DIEN',
    'cáp điện',
    'cap dien',
    'Cáp Điện',
    'Cap Dien',
  ];

  useEffect(() => {
    if (dataTagSeos && !isLoadingTagSeos) {
      setTagSeos([defaultTagSeos, dataTagSeos?.map((item: TagSeo) => item.name)].join(','));
    }
  }, [dataTagSeos, defaultTagSeos, isLoadingTagSeos]);

  return (
    <Layout>
      <Helmet>
        <meta name="description" content="Dai Viet" />
        <meta name="keywords" content={tagSeos} />
      </Helmet>
      <Header className="header">
        {/* <Menu className='topMenu' mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
        <TemplateHeader />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <BreadcrumbComponent />
        <Layout className="layoutContent site-layout-background" style={{ padding: '24px 0' }}>
          {leftMenu}
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter />
      </Footer>
    </Layout>
  );
};

export default Template;
