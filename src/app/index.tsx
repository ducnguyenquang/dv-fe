/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

 import * as React from 'react';
 import { Helmet } from 'react-helmet-async';
 import { Switch, Route, BrowserRouter, useLocation } from 'react-router-dom';
 import moment from 'moment';
 
 import { GlobalStyle } from '../styles/global-styles';
 
//  import { NotFoundPage } from './components/NotFoundPage/Loadable';
 import { useTranslation } from 'react-i18next';
 import 'antd/dist/antd.less';
//  import { Navbar } from './components/Navbar';
 import Routes from '../config/routes';
//  import { useInjectReducer, useInjectSaga } from 'redux-injectors';
//  import { PrivateRoute } from './components/PrivateRoute';
//  import AdminRoute from 'routes/admin';
//  import PatientRoute from 'routes/patient';
//  import DoctorRoute from 'routes/doctor';
//  import { ROLES } from 'config/constant';
//  import { EmailConfirmed } from './containers/Authentication/EmailConfirmed';
 import { Login } from './containers/Authentication/Login';
//  import { SignUp } from './containers/Authentication/SignUp';
//  import { ForgotPassword } from './containers/Authentication/ForgotPassword';
//  import { ResetPassword } from './containers/Authentication/ResetPassword';
//  import { reducer, sliceKey, useAuth } from './containers/Authentication/slice';
//  import { authSaga } from './containers/Authentication/saga';
 import { ConfigProvider } from 'antd';
//  import { LandingPage } from './containers/LandingPage';
//  import enGB from 'antd/lib/locale/en_GB';
//  import deDE from 'antd/lib/locale/de_DE';
//  import 'moment/locale/de';
 import { useDispatch, useSelector } from 'react-redux';
//  import { selectAuth } from './containers/Authentication/selectors';
//  import { UserGuides } from './containers/UserGuides/Loadable';
//  import { ThePlatform } from './containers/ThePlatform/Loadable';
//  import { Faq } from './containers/Faq/Loadable';
//  import { selectAccountManagement } from './containers/AccountManagement/selectors';
//  import { CookieBanner } from './components/CookieBanner/Loadable';
 
//  const antdLocale = {
//    'en-GB': enGB,
//    de: deDE,
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
   const { i18n } = useTranslation();
    console.log('==== cus APP')
   /** REDUX HOOKS **/
//    const { actions: authActions } = useAuth();
//    let { role, user } = useSelector(selectAuth);
//    const { profile } = useSelector(selectAccountManagement);
    // let { role, user } = null;
    // const { profile } = null;
   const dispatch = useDispatch();
   const [cookieIsAccepted, setCookieIsAccepted] = React.useState(
     localStorage.getItem('acceptCookie'),
   );
 
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
           htmlAttributes={{ lang: i18n.language }}
         >
           <meta name="description" content="Dai Viet" />
         </Helmet>
 
         <ScrollToTop />
 
         <Switch>
           {/* <Route
             exact
             path={process.env.PUBLIC_URL + Routes.Home._}
             render={() => (
               <>
                 <Navbar />
                 <LandingPage />
               </>
             )}
           />
           <Route
             exact
             path="/user-guides"
             render={() => (
               <React.Fragment>
                 <Navbar />
                 <UserGuides />
               </React.Fragment>
             )}
           />
           <Route
             exact
             path="/the-platform"
             render={() => (
               <React.Fragment>
                 <Navbar />
                 <ThePlatform />
               </React.Fragment>
             )}
           />
           <Route
             exact
             path="/faq"
             render={() => (
               <React.Fragment>
                 <Navbar />
                 <Faq />
               </React.Fragment>
             )}
           /> */}
           <Route
              exact
              path={'/login'}
              component={Login}
           />
           {/* <Route
             path={process.env.PUBLIC_URL + Routes.SignIn.Admin}
             component={SignIn}
           />
           <Route
             path={process.env.PUBLIC_URL + Routes.SignUp._}
             component={SignUp}
           />
           <Route
             path={process.env.PUBLIC_URL + Routes.ForgotPassword._}
             component={ForgotPassword}
           />
           <Route
             path={process.env.PUBLIC_URL + Routes.ResetPassword._}
             component={ResetPassword}
           />
           <Route
             path={process.env.PUBLIC_URL + '/active-user'}
             component={EmailConfirmed}
           /> */}
           {/* {getPrivateRoutes()} */}
           {/* <Route component={NotFoundPage} /> */}
         </Switch>
         {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
 
         <GlobalStyle />
       </BrowserRouter>
     </ConfigProvider>
   );
 }
 