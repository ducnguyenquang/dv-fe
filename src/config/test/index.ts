const TESTID = {
  // Login screens
  Login_InputEmail: 'login_email',
  Login_InputPassword: 'login_password',
  Login_ButtonLogin: 'login_button',
  Login_ButtonSignUp: 'signup_button',
  Login_ButtonSignUpHere: 'signuphere_button',
  Login_ButtonForgotPassword: 'login_forgotpassword',
  Login_ButtonChangeRole: 'login_changerole',

  // Sign up screens
  Signup_InputFirstname: 'signup_firstname',
  Signup_InputLastname: 'signup_lastname',
  Signup_InputEmail: 'signup_email',
  Signup_InputPassword: 'signup_password',
  Signup_InputConfirmPassword: 'signup_confirmpassword',
  Signup_ButtonContinue: 'signup_continue',
  SignUp_ButtonSignIn: 'signin_button',
  SignUp_ButtonChangeRole: 'signup_changerole',
  SignUp_ButtonTnC: 'signup_term',
  SignUp_ButtonContract: 'signup_contract',
  SignUp_ButtonPrivacy: 'signup_policy',

  // Forgot passwords
  ForgotPassword_InputEmail: 'forgot_email',
  ForgotPassword_ButtonSubmit: 'forgot_submit',
  ForgotPassword_ButtonSignIn: 'signin_button',

  // Reset password
  ResetPassword_InputPassword: 'reset_password',
  ResetPassword_InputPasswordConfirm: 'reset_passwordconfirm',
  ResetPassword_ButtonSubmit: 'reset_submit',
  ResetPassword_ButtonSignIn: 'signin_button',

  //[WDSM]: Doctor's service management
  WDSM_buttonAddService: 'button_addservice',

  //[WDCMTAS] Doctor choose method to Add service'
  WDCMTAS_addFromTemplate: 'option_addfromtemplate',
  WDCMTAS_proposeService: 'option_proposeservice',
  // Check Your Email
  Checkemail_Text: 'check_your_email',

  // Patient Choose Booking Method
  WPCBM_categoriesMethod: 'wpcbm_categoriesmethod',
  WPCBM_checkboxCategoriesMethod: 'wpcbm_checkboxcategoriesmethod',
  WPCBM_specificDoctorMethod: 'wpcbm_specificdoctormethod',
  WPCBM_checkboxSpecificDoctorMethod: 'wpcbm_checkboxspecificdoctormethod',

  //  Patient Choose Booking Category
  WPCC_buttonClose: 'wpcc_buttonclose',
  WPCC_buttonNext: 'wpcc_buttonnext',
  WPCC_categoriesItem: 'wpcc_categoriesitem',
  WPCC_confirmPopupItem: 'wpcc_confirmpopupitem',

  // Patient Choose Booking Doctor
  WPCDT_buttonClose: 'wpcdt_buttonclose',
  WPCDT_buttonNext: 'wpcdt_buttonnext',
  WPCDT_buttonBack: 'wpcdt_buttonback',
  WPCDT_confirmPopupItem: 'wpcdt_confirmpopupitem',
  WPCDT_doctorsItem: 'wpcdt_doctorsitem',
  WPCDT_textSearch: 'wpcdt_textsearch',
  WPCDT_selectTypeSearch: 'wpcdt_selecttypesearch',

  // Patient Choose Booking Service
  WPCS_buttonClose: 'wpcs_buttonclose',
  WPCS_buttonNext: 'wpcs_buttonnext',
  WPCS_buttonBack: 'wpcs_buttonback',
  WPCS_confirmPopupItem: 'wpcs_confirmpopupitem',
  WPCS_servicesItem: 'wpcs_servicesitem',
  WPCS_textSearch: 'wpcs_textsearch',
  WPCS_buttonSearch: 'wpcs_buttonsearch',

  // Patient Choose Date Service
  WPCD_buttonClose: 'wpcd_buttonclose',
  WPCD_buttonNext: 'wpcd_buttonnext',
  WPCD_buttonBack: 'wpcd_buttonback',
  WPCD_confirmPopupItem: 'wpcd_confirmpopupitem',
  WPCD_datesItem: 'wpcd_datesitem',
  WPCD_selectMonth: 'wpcd_selectmonth',
  WPCD_selectYear: 'wpcd_selectyear',
  WPCD_filterMonth: 'wpcd_filtermonth',
  WPCD_filterYear: 'wpcd_filteryear',

  // Patient Account
  WPA_tabProfile: 'wpa_tabprofile',
  WPA_tabBillingAddress: 'wpa_tabbillingaddress',
  WPA_tabChangePassword: 'wpa_tabchangepassword',
  WPA_tabProfileContent: 'wpa_tabprofilecontent',
  WPA_tabBillingAddressContent: 'wpa_tabbillingaddresscontent',
  WPA_tabChangePasswordContent: 'wpa_tabchangepasswordcontent',

  // Patient Profile
  WPP_inputFirstName: 'wpp_inputfirstname',
  WPP_inputLastName: 'wpp_inputlastname',
  WPP_dateDateOfBirth: 'wpp_datedateofbirth',
  WPP_selectGender: 'wpp_selectgender',
  WPP_selectPhoneNumber: 'wpp_selectphonenumber',
  WPP_inputPhoneNumber: 'wpp_inputphonenumber',
  WPP_selectCountry: 'wpp_selectcountry',
  WPP_buttonSave: 'wpp_buttonsave',

  // Patient Billing Address
  WPBA_buttonAddBillingAddress: 'wpba_buttonaddbillingaddress',
  WPBA_buttonSetDefault: 'wpba_buttonsetdefault',
  WPBA_buttonModify: 'wpba_buttonmodify',
  WPBA_buttonRemove: 'wpba_buttonremove',
  WPBA_buttonAdd: 'wpba_buttonadd',

  // Patient Change Password
  WPCP_inputCurrentPassword: 'wpcp_inputcurrentpassword',
  WPCP_inputNewPassword: 'wpcp_inputnewpassword',
  WPCP_inputConfirmPassword: 'wpcp_inputconfirmpassword',
  WPCP_buttonSave: 'wpcp_buttonsave',
  // Doctor Account
  Doctor_Profile_Tab: 'doctor_profile_tab',
  Account_Management_Save_Btn: 'account_management_save_btn',
  Account_Management_InputFirstName: 'account_management_input_firstname',
  Account_Management_InputLastName: 'account_management_input_lastname',
  Account_Management_PhoneNum: 'account_management_phone_num',
  Account_Management_Del_BankAccount: 'account_management_del_bank_account',
  Account_Management_InputBank_Acc_Holder:
    'account_management_input_bank_holder',
  Account_Management_InputIBAN: 'account_management_input_iban',
  Account_Management_InputBankName: 'account_management_input_bank_name',
  Account_Management_InputBIC: 'account_management_input_bic',
  Account_Management_Confirm_Add_Bank_Acc:
    'account_management_confirm_add_bank_acc',

  // UploadedDocument
  UPLOADED_DOC_DOWNLOAD_BTN: 'uploaded_doc_download_btn',
  UPLOADED_DOC_DELETE_BTN: 'uploaded_doc_delete_btn',

  // UploadedReports
  UPLOADED_REPORT_DOWNLOAD_BTN: 'uploaded_report_download_btn',
  UPLOADED_REPORT_DELETE_BTN: 'uploaded_report_delete_btn',

  // Patient Appointment Management
  WPAM_buttonBookingService: 'wpam_buttonbookingservice',

  // Patient Choose Timeslot
  WPCT_timeslotItem: 'wpct_timeslotitem',

  // Patient Answer Question
  WPAQ_sliderItem: 'wpaq_slideritem',
  // Chatbox
  CHAT_BOX_SEND_MSG_BTN: 'chat_box_send_msg_btn',

  // Doctor Service
  WDANS_SelectQuestion: 'select_question',
};
export { TESTID };
