const Routes = {
  Home: {
    _: '/',
  },
  Login: {
    _: '/login',
    // Admin: '/admin/sign-in',
  },
  ForgotPassword: {
    _: '/forgot-password',
  },
  ResetPassword: {
    _: '/reset-password',
  },
  Service: {
    _: '/services',
  },
  SignIn: {
    _: '/sign-in',
    Admin: '/admin/sign-in',
  },
  SignUp: {
    _: '/sign-up',
  },
  Dashboard: {
    _: '/dashboard',

    Service: {
      _: '/dashboard/service',
    },
    Appointment: {
      _: '/dashboard/appointment',
    },
    UploadedCertificate: {
      _: '/dashboard/uploaded-certificate',
    },
    Setting: {
      _: '/dashboard/setting',
    },
    Revenue: {
      _: '/dashboard/revenue',
    },
    Account: {
      _: '/dashboard/account/profile',
    },
    DoctorManagement: {
      _: '/dashboard/doctor-management',
    },
    CustomizeNotification: {
      _: '/dashboard/notification',
    },
    SystemNotification: {
      _: '/dashboard/system-notification',
    },
  },
};

export default Routes;
