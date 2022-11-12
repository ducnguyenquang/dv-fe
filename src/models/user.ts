import type { UploadFile } from 'antd/es/upload/interface';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVED = 'ACTIVED',
  REJECTED = 'REJECTED',
}
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  phone?: string;
  status?: UserStatus;
  images?: UploadFile[];
}

export type UserCreatePayload = Pick<
  User,
  'firstName' | 'lastName' | 'role' | 'email' | 'phone'
> & {
  sendActivationEmail: boolean;
};

export type UserUpdatePayload = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'role' | 'email' | 'phone'
>;

type UserQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    id: string;
    desc: boolean;
  };
  search?: string;
  roles?: string[];
  states?: string[];
};

export type UserQueryPayload = Partial<UserQueryBase>;

export type LoginPayload = Pick<User, 'email'> & {
  password?: string;
};

export type UserDetailPayload = Pick<User, 'id' | 'firstName' | 'lastName' | 'role' | 'email' | 'phone'> & {
  _id?: string;
};

export type UserDeletePayload = Pick<User, 'id'>;

export type AllUsersQueryPayload = {
  search: string;
  role?: UserRole;
};

export type UserAuthentication = Partial<User> & {
  token?: string;
};
