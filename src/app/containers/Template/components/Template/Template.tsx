import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { Header as TemplateHeader } from './components/Header';
import { Footer as TemplateFooter } from './components/Footer';

import './Template.less';
import 'app/components/Editor/ck-style.less';

import { BreadcrumbComponent } from '../BreadcrumbComponent';
import { Helmet } from 'react-helmet-async';
import { templatesHooks } from '../../hooks';
import { TagSeo } from 'models/tagSeo';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import HamburgerMenu from 'app/components/HamburgerMenu/HamburgerMenu';
import { Logo } from './components/Header/components/Logo';
// import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';

interface IProps {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
  hasTopMenu?: boolean;
  hasAdvertisement?: boolean;
}
const Template = ({ content, leftMenu, hasBreadcrumb, hasTopMenu, hasAdvertisement }: IProps): JSX.Element => {
  const [tagSeos, setTagSeos] = useState<string>();
  const { isMobile } = useContext(AppContext);
  const { Header, Content } = Layout;
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [layoutStructure, setLayoutStructure] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_TEMPLATE,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

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

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      // setDataSource(templateData.data);
      const bgColor = templateData.data?.find((item: any) => item.name === SETTINGS.BACKGROUND_COLOR);
      const layout = templateData.data?.find((item: any) => item.name === SETTINGS.LAYOUT_STRUCTURE);

      if (bgColor) {
        setBackgroundColor(bgColor?.value as string);
      }
      if (layout) {
        setLayoutStructure(layout?.value as string);
      }
    }
  }, [isLoadingTemplateData, templateData, setLayoutStructure, setBackgroundColor]);

  const backgroundColorStyle = backgroundColor
    ? {
        backgroundColor: backgroundColor,
      }
    : {};

  return (
    <Layout
      className={`template-layout ${isMobile && 'template-layout-mobile'} ${
        layoutStructure && !isMobile && `template-layout-${layoutStructure}`
      }`}
      style={backgroundColorStyle}
    >
      <Helmet>
        <meta name="description" content="Dai Viet" />
        <meta name="keywords" content={tagSeos} />
      </Helmet>
      {isMobile ? <HamburgerMenu /> : hasTopMenu && <Header className="header">{<TemplateHeader />}</Header>}
      <Content>
        {!isMobile && hasBreadcrumb && <BreadcrumbComponent />}
        {leftMenu ? (
          <Layout className={`layoutContent site-layout-background`}>
            {!isMobile && leftMenu}
            {isMobile ? (
              <div className={isMobile ? `mobileBlock` : ''}>
                {isMobile && (
                  <div className="logo">
                    <Logo />
                  </div>
                )}
                <Content>{content}</Content>
              </div>
            ) : (
              <Content>{content}</Content>
            )}
          </Layout>
        ) : (
          <div className={isMobile ? `mobileBlock` : ''}>
            {isMobile && (
              <div className="logo">
                <Logo />
              </div>
            )}
            <Content style={{ padding: '0 1rem', minHeight: 280 }}>{content}</Content>
          </div>
        )}
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>
        <TemplateFooter hasAdvertisement={hasAdvertisement} />
      </Footer>
    </Layout>
  );
};

export default Template;
