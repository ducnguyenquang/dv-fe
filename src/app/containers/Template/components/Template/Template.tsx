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
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import HamburgerMenu from 'app/components/HamburgerMenu/HamburgerMenu';
import { Logo } from './components/Header/components/Logo';
interface IProps {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
  hasTopMenu?: boolean;
}
const Template = ({ content, leftMenu, hasBreadcrumb, hasTopMenu }: IProps): JSX.Element => {
  const [tagSeos, setTagSeos] = useState<string>();
  const { isMobile } = useContext(AppContext);
  const { Header, Content } = Layout;

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
    <Layout className={`template-layout ${isMobile && 'template-layout-mobile'}`}>
      <Helmet>
        <meta name="description" content="Dai Viet" />
        <meta name="keywords" content={tagSeos} />
      </Helmet>
      {isMobile ? <HamburgerMenu /> :  hasTopMenu && <Header className="header">{<TemplateHeader />}</Header>}
      <Content style={{ padding: '0 1rem' }}>
        {hasBreadcrumb && <BreadcrumbComponent />}
        {leftMenu ? (
          <Layout className="layoutContent site-layout-background" style={{ padding: '1rem 0' }}>
            {!isMobile && leftMenu}
            <Content style={{ padding: '0 1rem', minHeight: 280 }}>{content}</Content>
          </Layout>
        ) : (
          <div className={isMobile ? `mobileBlock` : ''}>
            {isMobile && <div className='logo'><Logo /></div>}
            <Content style={{ padding: '0 1rem', minHeight: 280 }}>{content}</Content>
          </div>
        )}
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter />
      </Footer>
    </Layout>
  );
};

export default Template;
