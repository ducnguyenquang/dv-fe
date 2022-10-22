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
import moment from 'moment';
import { useTranslation } from 'react-i18next';

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

//  import { SignUp } from './containers/Authentication/SignUp';
//  import { ForgotPassword } from './containers/Authentication/ForgotPassword';
//  import { ResetPassword } from './containers/Authentication/ResetPassword';
//  import { reducer, sliceKey, useAuth } from './containers/Authentication/slice';
//  import { authSaga } from './containers/Authentication/saga';
import { ConfigProvider } from 'antd';
//  import { LandingPage } from './containers/LandingPage';
//  import enGB from 'antd/lib/locale/en_GB';
//  import viVN from 'antd/lib/locale/vi_VN';
//  import 'moment/locale/de';
import { useDispatch, useSelector } from 'react-redux';
import LanguageProvider from './components/LanguageProvider/LanguageProvider';
import { useIntl } from 'react-intl';
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
  /** INJECTION **/
  //    useInjectReducer({ key: sliceKey, reducer: reducer });
  //    useInjectSaga({ key: sliceKey, saga: authSaga });

  /** I18n HOOKS **/
  //  const { i18n } = useTranslation();
  // console.log('==== cus APP');
  /** REDUX HOOKS **/
  //    const { actions: authActions } = useAuth();
  //    let { role, user } = useSelector(selectAuth);
  //    const { profile } = useSelector(selectAccountManagement);
  // let { role, user } = null;
  // const { profile } = null;
  const dispatch = useDispatch();
  const [cookieIsAccepted, setCookieIsAccepted] = React.useState(localStorage.getItem('acceptCookie'));
  // const intl = useIntl();

  /** ROUTER HOOKS **/
  // const history = useHistory();

  /** FUNCTIONS **/
  const onAcceptCookie = () => {
    const acceptCookieVal = 'true';
    localStorage.setItem('acceptCookie', acceptCookieVal);
    setCookieIsAccepted(acceptCookieVal);
  };
  //    const getPrivateRoutes = () => {
  //      switch (role) {
  //        case ROLES.patient:
  //          return <PrivateRoute component={PatientRoute} />;
  //        case ROLES.doctor:
  //          return <PrivateRoute component={DoctorRoute} />;
  //        case ROLES.admin:
  //          return <PrivateRoute component={AdminRoute} />;
  //        default:
  //          return <PrivateRoute component={AdminRoute} />;
  //      }
  //    };

  // Get FCM
  //  React.useEffect(() => {
  //    moment.locale(i18n.language);
  //  }, [i18n.language]);

  //  React.useEffect(() => {
  //    // const lang = localStorage.getItem('i18nextLng');
  //    // const updatedLang = lang ? lang?.split('-')[0] : 'en';
  //    i18n.changeLanguage('en');
  //  }, [i18n]);

  //    React.useEffect(() => {
  //      if (!user?.profile && profile?.user) {
  //        dispatch(authActions.setUser(profile.user));
  //      }
  //      // eslint-disable-next-line react-hooks/exhaustive-deps
  //    }, [profile?.user]);
  // ConfigProvider.config({
  //   // prefixCls: 'custom',
  //   theme: {
  //     primaryColor: '#E5704B',
  //   },
  // });

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
              path={'/products'}
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
          </Routes>
          {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  );
}
