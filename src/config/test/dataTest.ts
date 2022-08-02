export const dataTest = {
  /**PATIENT */
  // SignIn - Patient
  WPSI: {
    email: 'patient_paul@yopmail.com',
    invalidEmail: 'patient_paul',
    notExistEmail: 'notexist@email.com',
    password: '123456',
  },
  // SignIn - Doctor
  WDSI: {
    email: 'doctor_john@yopmail.com',
    invalidEmail: 'doctor_john',
    notExistEmail: 'notexist@email.com',
    password: '123456',
  },
  // SignUp - Patient
  WPSU: {
    firstName: 'Paul',
    lastName: 'Anderson',
    email: 'patient_paul1@yopmail.com',
    existedEmail: 'patient_paul@yopmail.com',
    password: '123456',
    invalidEmail: 'patient_paul1',
    invalidPassword: '12345',
  },
  // SignUp - Doctor
  WDSU: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'doctor_john1@yopmail.com',
    existedEmail: 'doctor_john1@yopmail.com',
    password: '123456',
    invalidEmail: 'doctor_john1',
    invalidPassword: '12345',
  },
  // Forgot Password - Doctor
  WDFP: {
    email: 'doctor_john@yopmail.com',
    invalidEmail: 'doctor_john',
    notExistEmail: 'notexist@email.com',
  },

  // Forgot Password - Patient
  WPFP: {
    email: 'patient_paul@yopmail.com',
    invalidEmail: 'patient_paul',
    notExistEmail: 'notexist@email.com',
  },
  // Reset Password - Patient
  WPRP: {
    password: '123456',
    invalidPassword: '12345',
    invalidPassword2: '12345678910112',
  },
  // Reset Password - Doctor
  WDRP: {
    password: '123456',
    invalidPassword: '12345',
    invalidPassword2: '12345678910112',
  },
  // Appointment Detail Patient Document
  ADPD: {
    appointmentId: '60e4d55e3f1af8001dcb34b7',
  },
  // Appointment Detail Doctor Document
  ADDD: {
    appointmentId: '60e4d55e3f1af8001dcb34b7',
  },
  // Setting Profile
  SP: {
    firstName: 'First',
    lastName: 'Last',
    phone: '12345678',
    birthday: '1999/07/07',
    country: 'Vietnam',
    additionalAddress: '456 Bui Thi Xuan',
  },
  // Setting Add Billing Address
  SABA: {
    firstName: 'First',
    lastName: 'Last',
    street: 'Phan Dinh Phung',
    houseNumber: '123',
    postalZipcode: '700000',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    additionalAddress: '456 Bui Thi Xuan',
  },
  // Setting Change Password
  SCP: {
    currentPassword: '123456',
    newPassword: '1234567',
  },
  // Patient Profile
  WPP: {
    firstName: 'First name',
    lastName: 'Last name',
    dataOfBirth: '2000/01/01',
    gender: 'male',
    phoneNumber: '12345678',
    selectPhoneNmuber: '+84',
    country: 'Vietnam',
  },
};
