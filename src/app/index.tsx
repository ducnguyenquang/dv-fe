import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

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
import { ORIENTATION } from 'constants/common';
import { isMobile } from 'react-device-detect';

import { Context as AppContext } from './context/appContext';

type TemplateType = {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
  orientation?: string;
  hasTopMenu?: boolean;
};

function App(props: { isLandscape: boolean; isPortrait: boolean }) {
  const { isLandscape, isPortrait } = props;
  const orientation = isLandscape ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
  const dispatch = useDispatch();
  const [cookieIsAccepted, setCookieIsAccepted] = React.useState(localStorage.getItem('acceptCookie'));

  const onAcceptCookie = () => {
    const acceptCookieVal = 'true';
    localStorage.setItem('acceptCookie', acceptCookieVal);
    setCookieIsAccepted(acceptCookieVal);
  };

  const getTemplate = ({ content, leftMenu, hasBreadcrumb = false, hasTopMenu = true }: TemplateType) => {
    return (
      <AppContext.Provider value={{ orientation, isMobile }}>
        <Template leftMenu={leftMenu} content={content} hasBreadcrumb={hasBreadcrumb} hasTopMenu={hasTopMenu} />
      </AppContext.Provider>
    );
  };

  // alert(orientation);
  return (
    <ConfigProvider>
      <BrowserRouter>
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
          <Routes>
            <Route path={'/'} element={getTemplate({ content: <HomePage /> })} />
            <Route path={'/electrical-cable'} element={getTemplate({ content: <ElectricalCable /> })} />
            <Route path={'/led-light'} element={getTemplate({ content: <LedLight /> })} />
            <Route path={'/admin'} element={<AdminTemplate content={<AdminProductTable />} />} />
            <Route path={'/admin/login'} element={<AdminLogin />} />
            <Route path={'/admin/signup'} element={<AdminSignUp />} />
            <Route path={'/admin/changePassword'} element={<AdminChangePassword />} />
            <Route path={'/admin/products'} element={<AdminTemplate content={<AdminProductTable />} />} />
            <Route path={'/admin/product/:id'} element={<AdminTemplate content={<AdminProductUpdate />} />} />
            <Route path={'/admin/product/add'} element={<AdminTemplate content={<AdminProductAdd />} />} />
            <Route path={'/admin/categories'} element={<AdminTemplate content={<AdminCategoryTable />} />} />
            <Route path={'/admin/category/:id'} element={<AdminTemplate content={<AdminCategoryUpdate />} />} />
            <Route path={'/admin/category/add'} element={<AdminTemplate content={<AdminCategoryAdd />} />} />
            <Route path={'/admin/users'} element={<AdminTemplate content={<AdminUserTable />} />} />
            <Route path={'/admin/user/:id'} element={<AdminTemplate content={<AdminUserUpdate />} />} />
            <Route path={'/admin/user/add'} element={<AdminTemplate content={<AdminUserAdd />} />} />
            <Route path={'/admin/orders'} element={<AdminTemplate content={<AdminOrderTable />} />} />
            <Route path={'/admin/order/:id'} element={<AdminTemplate content={<AdminOrderUpdate />} />} />
            <Route path={'/admin/order/add'} element={<AdminTemplate content={<AdminOrderAdd />} />} />
            <Route path={'/admin/brands'} element={<AdminTemplate content={<AdminBrandTable />} />} />
            <Route path={'/admin/brand/:id'} element={<AdminTemplate content={<AdminBrandUpdate />} />} />
            <Route path={'/admin/brand/add'} element={<AdminTemplate content={<AdminBrandAdd />} />} />

            <Route
              path={'/admin/setting/emailTemplate'}
              element={<AdminTemplate content={<AdminEmailTemplateTable />} />}
            />
            <Route
              path={'/admin/setting/emailTemplate/:id'}
              element={<AdminTemplate content={<AdminEmailTemplateUpdate />} />}
            />
            <Route
              path={'/admin/setting/emailTemplate/add'}
              element={<AdminTemplate content={<AdminEmailTemplateAdd />} />}
            />
            <Route path={'/admin/setting/popupMenu'} element={<AdminTemplate content={<AdminPopupMenuTable />} />} />
            <Route
              path={'/admin/setting/popupMenu/:id'}
              element={<AdminTemplate content={<AdminPopupMenuUpdate />} />}
            />
            <Route path={'/admin/setting/popupMenu/add'} element={<AdminTemplate content={<AdminPopupMenuAdd />} />} />
            <Route path={'/admin/setting/support'} element={<AdminTemplate content={<AdminSupportTable />} />} />
            <Route path={'/admin/setting/support/:id'} element={<AdminTemplate content={<AdminSupportUpdate />} />} />
            <Route path={'/admin/setting/support/add'} element={<AdminTemplate content={<AdminSupportAdd />} />} />
            <Route path={'/admin/setting/information'} element={<AdminTemplate content={<AdminInformation />} />} />
            <Route path={'/admin/setting/tagSeo'} element={<AdminTemplate content={<AdminTagSeo />} />} />
            <Route path={'/admin/setting/topMenus'} element={<AdminTemplate content={<AdminTopMenuTable />} />} />
            <Route path={'/admin/setting/topMenu/:id'} element={<AdminTemplate content={<AdminTopMenuUpdate />} />} />
            <Route path={'/admin/setting/topMenu/add'} element={<AdminTemplate content={<AdminTopMenuAdd />} />} />
            <Route path={'/admin/advertisements'} element={<AdminTemplate content={<AdminAdvertisementTable />} />} />
            <Route
              path={'/admin/advertisement/:id'}
              element={<AdminTemplate content={<AdminAdvertisementUpdate />} />}
            />
            <Route path={'/admin/advertisement/add'} element={<AdminTemplate content={<AdminAdvertisementAdd />} />} />
            <Route path={'/admin/projects'} element={<AdminTemplate content={<AdminProjectTable />} />} />
            <Route path={'/admin/project/:id'} element={<AdminTemplate content={<AdminProjectUpdate />} />} />
            <Route path={'/admin/project/add'} element={<AdminTemplate content={<AdminProjectAdd />} />} />
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
            <Route path="/admin/*" element={<AdminTemplate content={<EmptyPage />} />} />
          </Routes>
          {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default withOrientationChange(App);
