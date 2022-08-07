/* --- STATE --- */
export interface AuthState {
  user: any | null;
  token: string;
  loggedIn: boolean;
  role: TUserRole | null;
  error: string | null;
  errorMsg: string;
  status:
    | 'LOADING'
    | 'SIGNIN_SUCCESS'
    | 'SIGNIN_FAIL'
    | 'LOGGOUT_SUCCESS'
    | 'LOGGOUT_FAIL'
    | 'SIGNUP_SUCCESS'
    | 'SIGNUP_FAIL'
    | null;
}
export type TUserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN' | null;
/* --- REQUEST --- */
export interface UserRequest {
  username: string;
  password: string;
}

/* --- OTHERS --- */
export interface DecodedToken {
  exp: Number;
  iat: Number;
}
/* --- RESPONSE --- */
export interface UserResponse {
  access_token: string;
  userInfo: any;
}

export type ContainerState = AuthState;
