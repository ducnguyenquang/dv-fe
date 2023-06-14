import { useCallback, Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';
import './app.less';
import { AdminTemplate, Template } from 'app/containers/Template';

import {
  AdminLogin,
  AdminSignUp,
  AdminChangePassword,
  authenticationSelectors,
} from 'app/containers/Admin/Authentication';
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
  SkuTable as AdminSkuTable,
  SkuAdding as AdminSkuAdd,
  SkuUpdating as AdminSkuUpdate,
  RoutePathTable as AdminRoutePathTable,
  RoutePathAdding as AdminRoutePathAdd,
  RoutePathUpdating as AdminRoutePathUpdate,
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
import { AdminContactTable, AdminContactAdd, AdminContactUpdate } from 'app/containers/Admin/Contact';

import {
  AdminSettingPageTemplate,
  AdminSettingPageHomePage,
  AdminSettingPageProductCategory,
  AdminSettingPageContact,
} from 'app/containers/Admin/SettingPage';
import { AdminPageTable, AdminPageAdd, AdminPageUpdate } from 'app/containers/Admin/Page';

import { ProductList, ProjectList, ProductDetail, ProductFilter, SupportMenu } from 'app/containers/Product';

import { Cart } from 'app/containers/Cart';
import { HomePage } from 'app/containers/DashBoard/components/DashBoard/HomePage';

import { ElectricalCable } from 'app/containers/DashBoard/components/DashBoard/ElectricalCable';
import { LedLight } from 'app/containers/DashBoard/components/DashBoard/LedLight';
import { Contact } from 'app/containers/Contact';
import { AboutUs } from 'app/containers/AboutUs';
import { Faq } from 'app/containers/Faq';
import { SiteMap } from 'app/containers/SiteMap';
import { PageContent } from 'app/containers/Page';

import { ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
import { UserLogin, UserAccount, UserPurchase } from 'app/containers/User';

import { lazyLoad } from 'utils/lazyLoad';
import { storage } from 'utils';

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
  const [cookieIsAccepted, setCookieIsAccepted] = useState(localStorage.getItem('acceptCookie'));
  const [settingTemplate, setSettingTemplate] = useState();

  const tokenData = useSelector(authenticationSelectors.getAccessToken);
  const currentUserData = useSelector(authenticationSelectors.getCurrentUser);
  const clientTokenData = useSelector(authenticationSelectors.getClientAccessToken);
  const clientCurrentUserData = useSelector(authenticationSelectors.getClientCurrentUser);
  const avatarUserData = useSelector(authenticationSelectors.getAvatarUser);
  localStorage.clear();
  const [currentUser, setCurrentUser] = useState(currentUserData ? JSON.parse(currentUserData) : undefined);
  const [avatarUser, setAvatarUser] = useState(avatarUserData ? JSON.parse(avatarUserData) : undefined);
  const [token, setToken] = useState(tokenData ? tokenData : '');
  const TYPE_TEMPLATE = {
    CLIENT: 'client',
    ADMIN: 'admin',
  };
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
    }
  }, [isLoadingTemplateData, templateData]);

  useEffect(() => {
    if (currentUserData) {
      // const currentUserData = localStorage.getItem('CurrentUser');
      setCurrentUser(JSON.parse(currentUserData));
    }

    if (tokenData) {
      // const currentUserData = localStorage.getItem('CurrentUser');
      setToken(tokenData);
    }

    if (avatarUserData) {
      setAvatarUser(JSON.parse(avatarUserData));
    }
  }, [avatarUserData, currentUserData, tokenData]);

  const getStringToObject = useCallback((data: string) => {
    return data ? JSON.parse(data) : undefined;
  }, []);

  const getContextData = useCallback(
    (page: string) => {
      return {
        orientation,
        isMobile,
        settingTemplate,
        currentUser:
          page === TYPE_TEMPLATE.ADMIN ? getStringToObject(currentUserData) : getStringToObject(clientCurrentUserData),
        avatarUser,
        token: page === TYPE_TEMPLATE.ADMIN ? token : clientTokenData,
      };
    },
    [
      orientation,
      settingTemplate,
      TYPE_TEMPLATE.ADMIN,
      getStringToObject,
      currentUserData,
      clientCurrentUserData,
      avatarUser,
      token,
      clientTokenData,
    ]
  );

  const getTemplate = ({
    content,
    leftMenu,
    hasBreadcrumb = false,
    hasTopMenu = true,
    hasAdvertisement = false,
  }: TemplateType) => {
    return (
      <AppContext.Provider value={getContextData(TYPE_TEMPLATE.CLIENT)}>
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
      <AppContext.Provider value={getContextData(TYPE_TEMPLATE.ADMIN)}>
        <AdminTemplate content={content} />
      </AppContext.Provider>
    );
  };

  const getAppContext = (child: any) => {
    return <AppContext.Provider value={getContextData(TYPE_TEMPLATE.CLIENT)}>{child}</AppContext.Provider>;
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
          <Suspense fallback={<p>Loading page...</p>}>
            <Routes>
              <Route path={'/'} element={getTemplate({ content: <HomePage />, hasAdvertisement: true })} />
              <Route path="*" element={getTemplate({ content: <EmptyPage />, leftMenu: <SupportMenu /> })} />
              <Route path="/admin/*" element={getAdminTemplate({ content: <EmptyPage /> })} />
              <Route path={'/electrical-cable'} element={getTemplate({ content: <ElectricalCable /> })} />
              <Route path={'/led-light'} element={getTemplate({ content: <LedLight /> })} />
              <Route path={'/admin'} element={getAdminTemplate({ content: <AdminProductTable /> })} />
              <Route path={'/admin/login'} element={getAppContext(<AdminLogin />)} />
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
              <Route path={'/admin/setting/sku'} element={getAdminTemplate({ content: <AdminSkuTable /> })} />
              <Route path={'/admin/setting/sku/:id'} element={getAdminTemplate({ content: <AdminSkuUpdate /> })} />
              <Route path={'/admin/setting/sku/add'} element={getAdminTemplate({ content: <AdminSkuAdd /> })} />
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
              <Route path={'/admin/setting/pages'} element={getAdminTemplate({ content: <AdminPageTable /> })} />
              <Route path={'/admin/setting/page/:id'} element={getAdminTemplate({ content: <AdminPageUpdate /> })} />
              <Route path={'/admin/setting/page/add'} element={getAdminTemplate({ content: <AdminPageAdd /> })} />
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
              <Route path={'/admin/contacts'} element={getAdminTemplate({ content: <AdminContactTable /> })} />
              <Route path={'/admin/contact/:id'} element={getAdminTemplate({ content: <AdminContactUpdate /> })} />
              <Route path={'/admin/contact/add'} element={getAdminTemplate({ content: <AdminContactAdd /> })} />

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
                path={'/admin/setting-page/contact'}
                element={getAdminTemplate({ content: <AdminSettingPageContact /> })}
              />
              <Route
                path={'/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              />
              <Route
                path={'/product/:type/:id'}
                element={getTemplate({ content: <ProductDetail />, leftMenu: <SupportMenu />, hasBreadcrumb: true })}
              />
              <Route
                path={'/project/:id'}
                element={getTemplate({ content: <ProjectDetail />, leftMenu: <SupportMenu />, hasBreadcrumb: true })}
              />
              <Route
                path={'/:type/:category/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              />
              {/* <Route
                path={'/:type/:category/product'}
                element={getTemplate({
                  content: <ProductList />,
                  leftMenu: <ProductFilter extendChildren={<SupportMenu />} />,
                })}
              /> */}

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
              <Route path={'/project'} element={getTemplate({ content: <ProjectList />, leftMenu: <SupportMenu /> })} />
              <Route
                path={'/page/:id'}
                element={getTemplate({ content: <PageContent />, leftMenu: <SupportMenu />, hasBreadcrumb: false })}
              />
              <Route
                path={'/user/login'}
                element={getTemplate({ content: <UserLogin />, leftMenu: <SupportMenu />, hasBreadcrumb: false })}
              />
              <Route
                path={'/user/account'}
                element={getTemplate({ content: <UserAccount />, leftMenu: <SupportMenu />, hasBreadcrumb: false })}
              />
              <Route
                path={'/user/purchase'}
                element={getTemplate({ content: <UserPurchase />, leftMenu: <SupportMenu />, hasBreadcrumb: false })}
              />
            </Routes>
          </Suspense>
          {/* {cookieIsAccepted !== 'true' && <CookieBanner onOk={onAcceptCookie} />} */}
        </LanguageProvider>
        <GlobalStyle />
      </Router>
    </ConfigProvider>
  );
}

export default withOrientationChange(App);
