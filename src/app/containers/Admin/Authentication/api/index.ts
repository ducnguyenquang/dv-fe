import { LoginPayload, ChangePasswordPayload } from 'models/user';
import { changePassword } from './changePassword';
import { login } from './login';
import { register } from './register';

export const authenticationKeys = {
  all: ['authentication'] as const,
  details: () => [...authenticationKeys.all, 'detail'] as const,
  // detail: (params: CategoryDetailPayload) => [...authenticationKeys.details(), { params }] as const,
  // lists: () => [...authenticationKeys.all, 'list'] as const,
  // list: (params: CategoryQueryPayload) => [...authenticationKeys.lists(), { params }] as const,
  login: (params: LoginPayload) => [...authenticationKeys.details(), { params }] as const,
  changePassword: (params: ChangePasswordPayload) => [...authenticationKeys.details(), { params }] as const,
};

export const authenticationApi = {
  authenticationKeys,
  login,
  changePassword,
  register,
};
