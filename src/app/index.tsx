import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

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
import { AdminSupportTable, AdminSupportAdd, AdminSupportUpdate } from 'app/containers/Admin/Support';

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
import { useEffect, useMemo } from 'react';

type TemplateType = {
  content?: any;
  leftMenu?: any;
  hasBreadcrumb?: boolean;
  orientation?: string;
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

  const getTemplate = ({ content, leftMenu, hasBreadcrumb = false }: TemplateType) => {
    return (
      <AppContext.Provider value={{ orientation, isMobile }}>
        <Template
          leftMenu={leftMenu}
          content={content}
          hasBreadcrumb={hasBreadcrumb}
        />
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

        {/* <ScrollToTop /> */}
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
            <Route
              // exact
              path={'/'}
              element={getTemplate({ content: <HomePage /> })}
              // element={<HomePage orientation={orientation} />}
            />
            <Route
              // exact
              path={'/electrical-cable'}
              element={<ElectricalCable />}
            />
            <Route
              // exact
              path={'/led-light'}
              element={<LedLight />}
            />
            <Route
              // exact
              path={'/admin'}
              element={<AdminTemplate content={<AdminProductTable />} />}
            />
            <Route
              // exact
              path={'/admin/login'}
              element={<AdminLogin />}
            />
            <Route
              // exact
              path={'/admin/signup'}
              element={<AdminSignUp />}
            />
            <Route
              // exact
              path={'/admin/changePassword'}
              element={<AdminChangePassword />}
            />
            <Route
              // exact
              path={'/admin/products'}
              element={<AdminTemplate content={<AdminProductTable />} />}
            />
            <Route
              // exact
              path={'/admin/product/:id'}
              element={<AdminTemplate content={<AdminProductUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/product/add'}
              element={<AdminTemplate content={<AdminProductAdd />} />}
            />

            <Route
              // exact
              path={'/admin/categories'}
              element={<AdminTemplate content={<AdminCategoryTable />} />}
            />
            <Route
              // exact
              path={'/admin/category/:id'}
              element={<AdminTemplate content={<AdminCategoryUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/category/add'}
              element={<AdminTemplate content={<AdminCategoryAdd />} />}
            />

            <Route
              // exact
              path={'/admin/users'}
              element={<AdminTemplate content={<AdminUserTable />} />}
            />
            <Route
              // exact
              path={'/admin/user/:id'}
              element={<AdminTemplate content={<AdminUserUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/user/add'}
              element={<AdminTemplate content={<AdminUserAdd />} />}
            />
            <Route
              // exact
              path={'/admin/orders'}
              element={<AdminTemplate content={<AdminOrderTable />} />}
            />
            <Route
              // exact
              path={'/admin/order/:id'}
              element={<AdminTemplate content={<AdminOrderUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/order/add'}
              element={<AdminTemplate content={<AdminOrderAdd />} />}
            />
            <Route
              // exact
              path={'/admin/brands'}
              element={<AdminTemplate content={<AdminBrandTable />} />}
            />
            <Route
              // exact
              path={'/admin/brand/:id'}
              element={<AdminTemplate content={<AdminBrandUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/brand/add'}
              element={<AdminTemplate content={<AdminBrandAdd />} />}
            />

            <Route
              // exact
              path={'/admin/setting/emailTemplate'}
              element={<AdminTemplate content={<AdminEmailTemplateTable />} />}
            />
            <Route
              // exact
              path={'/admin/setting/emailTemplate/:id'}
              element={<AdminTemplate content={<AdminEmailTemplateUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/setting/emailTemplate/add'}
              element={<AdminTemplate content={<AdminEmailTemplateAdd />} />}
            />
            <Route
              // exact
              path={'/admin/setting/popupMenu'}
              element={<AdminTemplate content={<AdminPopupMenuTable />} />}
            />
            <Route
              // exact
              path={'/admin/setting/popupMenu/:id'}
              element={<AdminTemplate content={<AdminPopupMenuUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/setting/popupMenu/add'}
              element={<AdminTemplate content={<AdminPopupMenuAdd />} />}
            />
            <Route
              // exact
              path={'/admin/setting/support'}
              element={<AdminTemplate content={<AdminSupportTable />} />}
            />
            <Route
              // exact
              path={'/admin/setting/support/:id'}
              element={<AdminTemplate content={<AdminSupportUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/setting/support/add'}
              element={<AdminTemplate content={<AdminSupportAdd />} />}
            />
            <Route
              // exact
              path={'/admin/setting/information'}
              element={<AdminTemplate content={<AdminInformation />} />}
            />
            <Route
              // exact
              path={'/admin/setting/tagSeo'}
              element={<AdminTemplate content={<AdminTagSeo />} />}
            />
            <Route
              // exact
              path={'/admin/advertisements'}
              element={<AdminTemplate content={<AdminAdvertisementTable />} />}
            />
            <Route
              // exact
              path={'/admin/advertisement/:id'}
              element={<AdminTemplate content={<AdminAdvertisementUpdate />} />}
            />
            <Route
              // exact
              path={'/admin/advertisement/add'}
              element={<AdminTemplate content={<AdminAdvertisementAdd />} />}
            />
            <Route
              // exact
              path={'/product'}
              element={getTemplate({
                content: <ProductList />,
                leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
              })}
            />
            <Route
              // exact
              path={'/product/:id'}
              element={getTemplate({ content: <ProductDetail />, leftMenu: <SupportMenu />, hasBreadcrumb: true })}
            />
            <Route
              // exact
              path={'/electrical-cable/:category/product'}
              element={getTemplate({
                content: <ProductList />,
                leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
              })}
            />
            <Route
              // exact
              path={'/led-light/:category/product'}
              element={getTemplate({
                content: <ProductList />,
                leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
              })}
            />
            <Route
              // exact
              path={'/cart'}
              element={getTemplate({ content: <Cart />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/contact'}
              element={getTemplate({ content: <Contact />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/aboutUs'}
              element={getTemplate({ content: <AboutUs />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/faq'}
              element={getTemplate({ content: <Faq />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/siteMap'}
              element={getTemplate({ content: <SiteMap />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/consulting'}
              element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/catalogues'}
              element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
              path={'/pricing'}
              element={getTemplate({ content: <MaintenancePage />, leftMenu: <SupportMenu /> })}
            />
            <Route
              // exact
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
