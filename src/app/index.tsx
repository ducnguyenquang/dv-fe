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
import 'antd/dist/antd.less';
//  import { Navbar } from './components/Navbar';
//  import Routes from '../config/routes';
//  import { useInjectReducer, useInjectSaga } from 'redux-injectors';
//  import { PrivateRoute } from './components/PrivateRoute';
//  import AdminRoute from 'routes/admin';
//  import PatientRoute from 'routes/patient';
//  import DoctorRoute from 'routes/doctor';
//  import { ROLES } from 'config/constant';
//  import { EmailConfirmed } from './containers/Authentication/EmailConfirmed';
import { Login } from 'app/containers/Authentication/Login';
import { AdminProductTable, AdminProductAdd, AdminProductUpdate } from 'app/containers/Admin/Product';
import { AdminCategoryTable, AdminCategoryAdd, AdminCategoryUpdate } from 'app/containers/Admin/Category';
import { AdminUserTable, AdminUserAdd, AdminUserUpdate } from 'app/containers/Admin/User';


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
  console.log('==== cus APP');
  /** REDUX HOOKS **/
  //    const { actions: authActions } = useAuth();
  //    let { role, user } = useSelector(selectAuth);
  //    const { profile } = useSelector(selectAccountManagement);
  // let { role, user } = null;
  // const { profile } = null;
  const dispatch = useDispatch();
  const [cookieIsAccepted, setCookieIsAccepted] = React.useState(localStorage.getItem('acceptCookie'));

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

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Dai Viet"
          defaultTitle="Dai Viet"
          //  htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Dai Viet" />
        </Helmet>

        <ScrollToTop />
        <LanguageProvider>

        <Routes>
          <Route
            // exact
            path={'/login'}
            element={<Login />}
          />
          <Route
            // exact
            path={'/admin/products'}
            element={<AdminProductTable />}
          />
          <Route
            // exact
            path={'/admin/product/:id'}
            element={<AdminProductUpdate />}
          />
          <Route
            // exact
            path={'/admin/product/add'}
            element={<AdminProductAdd />}
          />
          
          <Route
            // exact
            path={'/admin/categories'}
            element={<AdminCategoryTable />}
          />
          <Route
            // exact
            path={'/admin/category/:id'}
            element={<AdminCategoryUpdate />}
          />
          <Route
            // exact
            path={'/admin/category/add'}
            element={<AdminCategoryAdd />}
          />

          <Route
            // exact
            path={'/admin/users'}
            element={<AdminUserTable />}
          />
          <Route
            // exact
            path={'/admin/user/:id'}
            element={<AdminUserUpdate />}
          />
          <Route
            // exact
            path={'/admin/user/add'}
            element={<AdminUserAdd />}
          />
        </Routes>
        {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  );
}
