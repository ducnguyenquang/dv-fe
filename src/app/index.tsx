/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

//  import { NotFoundPage } from './components/NotFoundPage/Loadable';
//  import { useTranslation } from 'react-i18next';
// import 'antd/dist/antd.less';
import './app.less';
//  import { Navbar } from './components/Navbar';
//  import Routes from '../config/routes';
//  import { useInjectReducer, useInjectSaga } from 'redux-injectors';
//  import { PrivateRoute } from './components/PrivateRoute';
//  import AdminRoute from 'routes/admin';
//  import PatientRoute from 'routes/patient';
//  import DoctorRoute from 'routes/doctor';
//  import { ROLES } from 'config/constant';
//  import { EmailConfirmed } from './containers/Authentication/EmailConfirmed';
import { AdminTemplate, Template } from 'app/containers/Template';

import { AdminLogin, AdminSignUp } from 'app/containers/Admin/Authentication';
import { AdminProductTable, AdminProductAdd, AdminProductUpdate } from 'app/containers/Admin/Product';
import { AdminCategoryTable, AdminCategoryAdd, AdminCategoryUpdate } from 'app/containers/Admin/Category';
import { AdminUserTable, AdminUserAdd, AdminUserUpdate } from 'app/containers/Admin/User';
import { AdminOrderTable, AdminOrderAdd, AdminOrderUpdate } from 'app/containers/Admin/Order';
import { AdminBrandTable, AdminBrandAdd, AdminBrandUpdate } from 'app/containers/Admin/Brand';
import { Common as AdminCommon } from 'app/containers/Admin/Setting';
import {
  AdminEmailTemplateTable,
  AdminEmailTemplateAdd,
  AdminEmailTemplateUpdate,
} from 'app/containers/Admin/EmailTemplate';
import { AdminPopupMenuTable, AdminPopupMenuAdd, AdminPopupMenuUpdate } from 'app/containers/Admin/PopupMenu';
import {
  AdminAdvertisementTable,
  AdminAdvertisementAdd,
  AdminAdvertisementUpdate,
} from 'app/containers/Admin/Advertisement';
import { AdminSupportTable, AdminSupportAdd, AdminSupportUpdate } from 'app/containers/Admin/Support';

import { ProductList, ProductDetail, ProductFilter } from 'app/containers/Product';

import { Cart } from 'app/containers/Cart';
import { DashBoard } from 'app/containers/DashBoard';
import { Contact } from 'app/containers/Contact';
import { AboutUs } from 'app/containers/AboutUs';
import { Faq } from 'app/containers/Faq';
import { SiteMap } from 'app/containers/SiteMap';
import { ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import LanguageProvider from './components/LanguageProvider/LanguageProvider';
import { Slide, ToastContainer } from 'react-toastify';
//  import { selectAuth } from './containers/Authentication/selectors';
//  import { UserGuides } from './containers/UserGuides/Loadable';
//  import { ThePlatform } from './containers/ThePlatform/Loadable';
//  import { Faq } from './containers/Faq/Loadable';
//  import { selectAccountManagement } from './containers/AccountManagement/selectors';
//  import { CookieBanner } from './components/CookieBanner/Loadable';

//  const antdLocale = {
//    'en-GB': enGB,
//    vi: viVN,
//  };

export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [pathname]);

  return null;
}

export function App() {
  const dispatch = useDispatch();
  const [cookieIsAccepted, setCookieIsAccepted] = React.useState(localStorage.getItem('acceptCookie'));
  
  const onAcceptCookie = () => {
    const acceptCookieVal = 'true';
    localStorage.setItem('acceptCookie', acceptCookieVal);
    setCookieIsAccepted(acceptCookieVal);
  };

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Đại Việt"
          defaultTitle="Đại Việt"
          //  htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Đại Việt" />
        </Helmet>

        <ScrollToTop />
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
              element={<DashBoard />}
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
              path={'/admin/setting/common'}
              element={<AdminTemplate content={<AdminCommon />} />}
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
              element={<Template leftMenu={<ProductFilter />} content={<ProductList />} />}
            />
            <Route
              // exact
              path={'/product/:id'}
              element={<Template content={<ProductDetail />} />}
            />
            <Route
              // exact
              path={'/cart'}
              element={<Template content={<Cart />} />}
            />
            <Route
              // exact
              path={'/contact'}
              element={<Template content={<Contact />} />}
            />
            <Route
              // exact
              path={'/aboutUs'}
              element={<Template content={<AboutUs />} />}
            />
            <Route
              // exact
              path={'/faq'}
              element={<Template content={<Faq />} />}
            />
            <Route
              // exact
              path={'/siteMap'}
              element={<Template content={<SiteMap />} />}
            />
          </Routes>
          {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  );
}
