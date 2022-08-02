// import { UserProfileState } from 'app/containers/UserProfile/types';
// import { DoctorServicesState } from 'app/containers/DoctorServices/types';
// import { AdminServicesState } from 'app/containers/AdminServices/types';
// import { PatientServicesState } from 'app/containers/PatientServices/types';
// import { DoctorScheduleState } from 'app/containers/DoctorSchedule/types';
// import { PatientAppointmentState } from 'app/containers/PatientAppointment/types';
// import { DoctorCertificateState } from 'app/containers/DoctorCertificate/types';
// import { DoctorAppointmentState } from 'app/containers/DoctorAppointment/types';
// import { UploadedCertificateState } from 'app/containers/UploadedCertificate/types';
// import { AdminDashboardState } from 'app/containers/AdminDashboard/types';
// import { DirectMessageState } from 'app/containers/DirectMessage/types';
// import { AuthState } from 'app/containers/Authentication/types';
// import { ForgotPasswordState } from 'app/containers/Authentication/ForgotPassword/types';
// import { AppointmentTrackingState } from 'app/containers/AppointmentTracking/types';
// import { AccountManagementState } from 'app/containers/AccountManagement/types';
// import { DoctorRevenueState } from 'app/containers/DoctorRevenue/types';
// import { ChatboxState } from 'app/containers/Chatbox/types';
// import { VideoCallState } from 'app/containers/VideoCall/types';
// import { DoctorStatisticState } from 'app/containers/DoctorStatistic/types';
// import { AdminDoctorManagementState } from 'app/containers/AdminDoctorManagement/types';
// import { AdminNotificationState } from 'app/containers/AdminNotification/types';
// import { AdminSystemNotificationState } from 'app/containers/AdminSystemNotification/types';

// import { MobileVersionState } from 'app/containers/MobileVersion/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // userProfile?: UserProfileState;
  // doctorServices?: DoctorServicesState;
  // adminServices?: AdminServicesState;
  // patientServices?: PatientServicesState;
  // doctorSchedule?: DoctorScheduleState;
  // patientAppointment?: PatientAppointmentState;
  // doctorCertificate?: DoctorCertificateState;
  // doctorAppointment?: DoctorAppointmentState;
  // uploadedCertificate?: UploadedCertificateState;
  // doctorRevenue?: DoctorRevenueState;
  // adminDashboard?: AdminDashboardState;
  // directMessage?: DirectMessageState;
  // auth?: AuthState;
  // forgotPassword?: ForgotPasswordState;
  // appointmentTracking?: AppointmentTrackingState;
  // accountManagement?: AccountManagementState;
  // chatbox?: ChatboxState;
  // videoCall?: VideoCallState;
  // doctorStatistic?: DoctorStatisticState;
  // adminDoctorManagement?: AdminDoctorManagementState;
  // adminNotification?: AdminNotificationState;
  // adminSystemNotification?: AdminSystemNotificationState;
  // mobileVersion?: MobileVersionState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
