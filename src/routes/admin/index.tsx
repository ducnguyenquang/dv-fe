import React from 'react';
import { Route, Routes, RouteProps } from 'react-router-dom';
// import { NotFoundPage } from 'app/components/NotFoundPage';
// import { AdminServices } from 'app/containers/AdminServices';
// import { UploadedCertificate } from 'app/containers/UploadedCertificate';
// import { AdminDashboard } from 'app/containers/AdminDashboard';
// import { AdminDoctorManagement } from 'app/containers/AdminDoctorManagement';
// import { AdminNotification } from 'app/containers/AdminNotification';
// import { AdminSystemNotification } from 'app/containers/AdminSystemNotification';
// import { AccountManagement } from 'app/containers/AccountManagement';

// import { dashboardRoute } from 'config/constant';
// import { AppointmentTracking } from 'app/containers/AppointmentTracking';
// import { MobileVersion } from 'app/containers/MobileVersion/Loadable';
interface Props {
  match: any;
}

const adminRoutes: RouteProps[] = [
  // {
  //   path: `${dashboardRoute}`,
  //   component: AdminDashboard,
  //   exact: true,
  // },
  // { path: `${dashboardRoute}/services`, component: AdminServices },
  // {
  //   path: `${dashboardRoute}/doctor-management`,
  //   component: AdminDoctorManagement,
  //   exact: true,
  // },
  // {
  //   path: `${dashboardRoute}/notification`,
  //   component: AdminNotification,
  //   exact: true,
  // },
  // {
  //   path: `${dashboardRoute}/system-notification`,
  //   component: AdminSystemNotification,
  //   exact: true,
  // },
  // {
  //   path: `${dashboardRoute}/uploaded-certificate`,
  //   component: UploadedCertificate,
  //   exact: true,
  // },
  // {
  //   path: `${dashboardRoute}/account`,
  //   component: AccountManagement,
  // },
  // {
  //   path: '/appointment-tracking/:appointmentId',
  //   component: AppointmentTracking,
  // },
  // {
  //   path: `${dashboardRoute}/mobile-versions`,
  //   component: MobileVersion,
  // },
  // { component: NotFoundPage },
];
export const adminPaths = adminRoutes
  .filter(route => route.path !== undefined)
  .map(route => route.path);

export function MainApp(_props: Props) {
  return (
    <div className="app-container">
      <Routes>
        {adminRoutes.map(route => (
          <Route {...route} />
        ))}
      </Routes>
    </div>
  );
}

export default MainApp;
