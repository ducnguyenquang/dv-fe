import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';
import './app.less';
import { AdminTemplate, Template } from 'app/containers/Template';

import { AdminLogin, AdminSignUp, AdminChangePassword } from 'app/containers/Admin/Authentication';
import { AdminProductTable, AdminProductAdd, AdminProductUpdate } from 'app/containers/Admin/Product';
import { AdminCategoryTable, AdminCategoryAdd, AdminCategoryUpdate } from 'app/containers/Admin/Category';
import { AdminUserTable, AdminUserAdd, AdminUserUpdate } from 'app/containers/Admin/User';
import { AdminOrderTable, AdminOrderAdd, AdminOrderUpdate } from 'app/containers/Admin/Order';
import { AdminBrandTable, AdminBrandAdd, AdminBrandUpdate } from 'app/containers/Admin/Brand';
import {
  TagSeo as AdminTagSeo,
  Information as AdminInformation,
  EmailTemplateTable as AdminEmailTemplateTable,
  EmailTemplateAdding as AdminEmailTemplateAdd,
  EmailTemplateUpdating as AdminEmailTemplateUpdate,
  SkuTable as AdminSkuTable, SkuAdding as AdminSkuAdd, SkuUpdating as AdminSkuUpdate,
  RoutePathTable as AdminRoutePathTable, RoutePathAdding as AdminRoutePathAdd, RoutePathUpdating as AdminRoutePathUpdate
} from 'app/containers/Admin/Setting';
import { AdminPopupMenuTable, AdminPopupMenuAdd, AdminPopupMenuUpdate } from 'app/containers/Admin/PopupMenu';
import {
  AdminAdvertisementTable,
  AdminAdvertisementAdd,
  AdminAdvertisementUpdate,
} from 'app/containers/Admin/Advertisement';
import { AdminProjectTable, AdminProjectAdd, AdminProjectUpdate } from 'app/containers/Admin/Project';
import { AdminSupportTable, AdminSupportAdd, AdminSupportUpdate } from 'app/containers/Admin/Support';
import { AdminTopMenuTable, AdminTopMenuAdd, AdminTopMenuUpdate } from 'app/containers/Admin/TopMenu';

import {
  AdminSettingPageTemplate,
  AdminSettingPageHomePage,
  AdminSettingPageProductCategory,
  // settingPagesHooks,
} from 'app/containers/Admin/SettingPage';

import { ProductList, ProductDetail, ProductFilter, SupportMenu } from 'app/containers/Product';

import { Cart } from 'app/containers/Cart';
import { HomePage } from 'app/containers/DashBoard/components/DashBoard/HomePage';

import { ElectricalCable } from 'app/containers/DashBoard/components/DashBoard/ElectricalCable';
import { LedLight } from 'app/containers/DashBoard/components/DashBoard/LedLight';
import { Contact } from 'app/containers/Contact';
import { AboutUs } from 'app/containers/AboutUs';
import { Faq } from 'app/containers/Faq';
import { SiteMap } from 'app/containers/SiteMap';
import { ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import LanguageProvider from './components/LanguageProvider/LanguageProvider';
import { Slide, ToastContainer } from 'react-toastify';
import { MaintenancePage } from 'app/containers/CommonPages/MaintenancePage';
import { EmptyPage } from 'app/containers/CommonPages/EmptyPage';
import { withOrientationChange } from 'react-device-detect';
import { ORIENTATION, PAGE_NAME } from 'constants/common';
import { isMobile } from 'react-device-detect';

import { Context as AppContext } from './context/appContext';
import { ProjectDetail } from './containers/DashBoard/components/Projects/components/ProjectDetail';
import { useEffect, useState } from 'react';
import { templatesHooks } from 'app/containers/Template';

import { lazyLoad } from 'utils/lazyLoad';

// const HomePage = lazyLoad('app/containers/DashBoard/components/DashBoard/HomePage', 'HomePage');

type TemplateType = {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
  orientation?: string;
  hasTopMenu?: boolean;
  hasAdvertisement?: boolean;
};

type AdminTemplateType = {
  content?: any;
};

function App(props: { isLandscape: boolean; isPortrait: boolean }) {
  const { isLandscape, isPortrait } = props;
  const orientation = isLandscape ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
  const dispatch = useDispatch();
  const [cookieIsAccepted, setCookieIsAccepted] = React.useState(localStorage.getItem('acceptCookie'));
  const [settingTemplate, setSettingTemplate] = useState();

  const onAcceptCookie = () => {
    const acceptCookieVal = 'true';
    localStorage.setItem('acceptCookie', acceptCookieVal);
    setCookieIsAccepted(acceptCookieVal);
  };

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_TEMPLATE,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      setSettingTemplate(templateData.data);
      // setDataSource(templateData.data);
      // const bgColor = templateData.data?.find((item: any) => item.name === SETTINGS.BACKGROUND_COLOR);
      // const layout = templateData.data?.find((item: any) => item.name === SETTINGS.LAYOUT_STRUCTURE);

      // if (bgColor) {
      //   setBackgroundColor(bgColor?.value as string);
      // }
      // if (layout) {
      //   setLayoutStructure(layout?.value as string);
      // }
    }
  }, [isLoadingTemplateData, templateData]);

  // const logoIcon =

  const getTemplate = ({
    content,
    leftMenu,
    hasBreadcrumb = false,
    hasTopMenu = true,
    hasAdvertisement = false,
  }: TemplateType) => {
    return (
      <AppContext.Provider value={{ orientation, isMobile, settingTemplate }}>
        <Template
          leftMenu={leftMenu}
          content={content}
          hasBreadcrumb={hasBreadcrumb}
          hasTopMenu={hasTopMenu}
          hasAdvertisement={hasAdvertisement}
        />
      </AppContext.Provider>
    );
  };

  const getAdminTemplate = ({ content }: AdminTemplateType) => {
    return (
      <AppContext.Provider value={{ orientation, isMobile, settingTemplate }}>
        <AdminTemplate content={content} />
      </AppContext.Provider>
    );
  };

  return (
    <ConfigProvider>
      <Router>
        <Helmet
          titleTemplate="%s - Đại Việt"
          defaultTitle="Đại Việt"
          //  htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Đại Việt" />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Helmet>
        <LanguageProvider>
          <ToastContainer
            autoClose={5000}
            hideProgressBar
            transition={Slide}
            draggable={false}
            pauseOnFocusLoss={false}
            limit={10}
          />
          <React.Suspense fallback={<p>Loading page...</p>}>
            <Routes>
              <Route
                path={'/'}
                element={getTemplate({ content: <HomePage />, hasAdvertisement: true })}
              />
              <Route path={'/electrical-cable'} element={getTemplate({ content: <ElectricalCable /> })} />
              <Route path={'/led-light'} element={getTemplate({ content: <LedLight /> })} />
              <Route path={'/admin'} element={getAdminTemplate({ content: <AdminProductTable /> })} />
              <Route path={'/admin/login'} element={<AdminLogin />} />
              <Route path={'/admin/signup'} element={<AdminSignUp />} />
              <Route path={'/admin/changePassword'} element={<AdminChangePassword />} />
              <Route path={'/admin/products'} element={getAdminTemplate({ content: <AdminProductTable /> })} />
              <Route path={'/admin/product/:id'} element={getAdminTemplate({ content: <AdminProductUpdate /> })} />
              <Route path={'/admin/product/add'} element={getAdminTemplate({ content: <AdminProductAdd /> })} />
              <Route path={'/admin/categories'} element={getAdminTemplate({ content: <AdminCategoryTable /> })} />
              <Route path={'/admin/category/:id'} element={getAdminTemplate({ content: <AdminCategoryUpdate /> })} />
              <Route path={'/admin/category/add'} element={getAdminTemplate({ content: <AdminCategoryAdd /> })} />
              <Route path={'/admin/users'} element={getAdminTemplate({ content: <AdminUserTable /> })} />
              <Route path={'/admin/user/:id'} element={getAdminTemplate({ content: <AdminUserUpdate /> })} />
              <Route path={'/admin/user/add'} element={getAdminTemplate({ content: <AdminUserAdd /> })} />
              <Route path={'/admin/orders'} element={getAdminTemplate({ content: <AdminOrderTable /> })} />
              <Route path={'/admin/order/:id'} element={getAdminTemplate({ content: <AdminOrderUpdate /> })} />
              <Route path={'/admin/order/add'} element={getAdminTemplate({ content: <AdminOrderAdd /> })} />
              <Route path={'/admin/brands'} element={getAdminTemplate({ content: <AdminBrandTable /> })} />
              <Route path={'/admin/brand/:id'} element={getAdminTemplate({ content: <AdminBrandUpdate /> })} />
              <Route path={'/admin/brand/add'} element={getAdminTemplate({ content: <AdminBrandAdd /> })} />

              <Route
                path={'/admin/setting/emailTemplate'}
                element={getAdminTemplate({ content: <AdminEmailTemplateTable /> })}
              />
              <Route
                path={'/admin/setting/emailTemplate/:id'}
                element={getAdminTemplate({ content: <AdminEmailTemplateUpdate /> })}
              />
              <Route
                path={'/admin/setting/emailTemplate/add'}
                element={getAdminTemplate({ content: <AdminEmailTemplateAdd /> })}
              />
              <Route
                path={'/admin/setting/sku'}
                element={getAdminTemplate({ content: <AdminSkuTable /> })}
              />
              <Route
                path={'/admin/setting/sku/:id'}
                element={getAdminTemplate({ content: <AdminSkuUpdate /> })}
              />
              <Route
                path={'/admin/setting/sku/add'}
                element={getAdminTemplate({ content: <AdminSkuAdd /> })}
              />
              <Route
                path={'/admin/setting/routePath'}
                element={getAdminTemplate({ content: <AdminRoutePathTable /> })}
              />
              <Route
                path={'/admin/setting/routePath/:id'}
                element={getAdminTemplate({ content: <AdminRoutePathUpdate /> })}
              />
              <Route
                path={'/admin/setting/routePath/add'}
                element={getAdminTemplate({ content: <AdminRoutePathAdd /> })}
              />
              <Route
                path={'/admin/setting/popupMenu'}
                element={getAdminTemplate({ content: <AdminPopupMenuTable /> })}
              />
              <Route
                path={'/admin/setting/popupMenu/:id'}
                element={getAdminTemplate({ content: <AdminPopupMenuUpdate /> })}
              />
              <Route
                path={'/admin/setting/popupMenu/add'}
                element={getAdminTemplate({ content: <AdminPopupMenuAdd /> })}
              />
              <Route path={'/admin/setting/support'} element={getAdminTemplate({ content: <AdminSupportTable /> })} />
              <Route
                path={'/admin/setting/support/:id'}
                element={getAdminTemplate({ content: <AdminSupportUpdate /> })}
              />
              <Route path={'/admin/setting/support/add'} element={getAdminTemplate({ content: <AdminSupportAdd /> })} />
              <Route
                path={'/admin/setting/information'}
                element={getAdminTemplate({ content: <AdminInformation /> })}
              />
              <Route path={'/admin/setting/tagSeo'} element={getAdminTemplate({ content: <AdminTagSeo /> })} />
              <Route path={'/admin/setting/topMenus'} element={getAdminTemplate({ content: <AdminTopMenuTable /> })} />
              <Route
                path={'/admin/setting/topMenu/:id'}
                element={getAdminTemplate({ content: <AdminTopMenuUpdate /> })}
              />
              <Route path={'/admin/setting/topMenu/add'} element={getAdminTemplate({ content: <AdminTopMenuAdd /> })} />
              <Route
                path={'/admin/advertisements'}
                element={getAdminTemplate({ content: <AdminAdvertisementTable /> })}
              />
              <Route
                path={'/admin/advertisement/:id'}
                element={getAdminTemplate({ content: <AdminAdvertisementUpdate /> })}
              />
              <Route
                path={'/admin/advertisement/add'}
                element={getAdminTemplate({ content: <AdminAdvertisementAdd /> })}
              />
              <Route path={'/admin/projects'} element={getAdminTemplate({ content: <AdminProjectTable /> })} />
              <Route path={'/admin/project/:id'} element={getAdminTemplate({ content: <AdminProjectUpdate /> })} />
              <Route path={'/admin/project/add'} element={getAdminTemplate({ content: <AdminProjectAdd /> })} />

              <Route
                path={'/admin/setting-page/template'}
                element={getAdminTemplate({ content: <AdminSettingPageTemplate /> })}
              />
              <Route
                path={'/admin/setting-page/home-page'}
                element={getAdminTemplate({ content: <AdminSettingPageHomePage /> })}
              />
              <Route
                path={'/admin/setting-page/product-category'}
                element={getAdminTemplate({ content: <AdminSettingPageProductCategory /> })}
              />
              <Route
                path={'/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              />
              <Route
                path={'/product/:id'}
                element={getTemplate({ content: <ProductDetail />, leftMenu: <SupportMenu />, hasBreadcrumb: true })}
              />
              <Route
                path={'/project/:id'}
                element={getTemplate({ content: <ProjectDetail />, leftMenu: <SupportMenu />, hasBreadcrumb: true })}
              />
              <Route
                path={'/electrical-cable/:category/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              />
              <Route
                path={'/led-light/:category/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              />
              <Route path={'/cart'} element={getTemplate({ content: <Cart />, leftMenu: <SupportMenu /> })} />
              <Route path={'/contact'} element={getTemplate({ content: <Contact />, leftMenu: <SupportMenu /> })} />
              <Route path={'/aboutUs'} element={getTemplate({ content: <AboutUs />, leftMenu: <SupportMenu /> })} />
              <Route path={'/faq'} element={getTemplate({ content: <Faq />, leftMenu: <SupportMenu /> })} />
              <Route path={'/siteMap'} element={getTemplate({ content: <SiteMap />, leftMenu: <SupportMenu /> })} />
              <Route
                path={'/consulting'}
                element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
              />
              <Route
                path={'/catalogues'}
                element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
              />
              <Route
                path={'/pricing'}
                element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
              />
              <Route
                path={'/projects'}
                element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
              />
              <Route path="*" element={getTemplate({ content: <EmptyPage />, leftMenu: <SupportMenu /> })} />
              <Route path="/admin/*" element={getAdminTemplate({ content: <EmptyPage /> })} />
            </Routes>
          </React.Suspense>
          {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </Router>
    </ConfigProvider>
  );
}

export default withOrientationChange(App);
