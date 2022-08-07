// export enum UserState {
//   ACTIVE = 'ACTIVE',
//   DELETED = 'DELETED',
//   INACTIVE = 'INACTIVE',
//   NEW = 'NEW',
// }

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

// export enum UserCreateOptions {
//   NEW_USER = 'NEW_USER',
//   IMPORT_CSV = 'IMPORT_CSV',
// }

// export type TUserCreateOptions = keyof typeof UserCreateOptions;

// TODO: will we need uuid (in messenger) ?
export interface User {
  id?: string;
  // companyId?: string;
  // state?: UserState;
  // uuid?: string;
  // userLanguage?: string;
  // identifier?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  phone?: string;
  // login?: string;
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

// export type UserSettingsPayload = Pick<
//   User,
//   'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'defaultPrivacyLevel'
// >;

export type LoginPayload = Pick<User, 'email'> & {
  password: string;
};

// export type LoginResponse = {
//   token: string;
//   refreshToken: string;
//   tokenType: string;
// };

// export type FormType = 'core' | 'profile';

// export type RegisterPayload = Pick<User, 'username' | 'password' | 'firstName' | 'lastName'>;
export type AllUsersQueryPayload = {
  search: string;
  role?: UserRole;
};
