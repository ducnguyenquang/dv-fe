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
// import { isMobile } from 'react-device-detect';
import { TemplateMobile } from '../TemplateMobile';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
interface IProps {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
}
const Template = ({ content, leftMenu, hasBreadcrumb }: IProps): JSX.Element => {
  const intl = useIntl();
  const [tagSeos, setTagSeos] = useState<string>();
  const { orientation, isMobile } = useContext(AppContext);

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
    'Đại Việt',
    'đại việt',
    'DAI VIET',
    'Dai Viet',
    'dai viet',
    'Cadivi',
    'CADIVI',
    'CÁP ĐIỆN',
    'Cáp Điện',
    'cáp điện',
    'CAP DIEN',
    'cap dien',
    'Cap Dien',
  ];

  useEffect(() => {
    if (dataTagSeos && !isLoadingTagSeos) {
      setTagSeos([defaultTagSeos, dataTagSeos?.map((item: TagSeo) => item.name)].join(','));
    }
  }, [dataTagSeos, defaultTagSeos, isLoadingTagSeos]);

  return (
    isMobile ? <TemplateMobile content={content} /> : (
      <Layout>
        <Helmet>
          <meta name="description" content="Dai Viet" />
          <meta name="keywords" content={tagSeos} />
        </Helmet>
        <Header className="header">{!isMobile && <TemplateHeader />}</Header>
        <Content style={{ padding: '0 50px' }}>
          {hasBreadcrumb && <BreadcrumbComponent />}
          {leftMenu ? (
            <Layout className="layoutContent site-layout-background" style={{ padding: '24px 0' }}>
              {leftMenu}
              <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
            </Layout>
          ) : (
            <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
          )}
        </Content>
        <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
          <TemplateFooter />
        </Footer>
      </Layout>
    )
  );
};

export default Template;
