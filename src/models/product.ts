// export enum UserState {
//   ACTIVE = 'ACTIVE',
//   DELETED = 'DELETED',
//   INACTIVE = 'INACTIVE',
//   NEW = 'NEW',
// }

// export enum UserRole {
//   CUSTOMER = 'CUSTOMER',
//   MANAGER = 'MANAGER',
//   ADMIN = 'ADMIN',
// }

// export enum UserCreateOptions {
//   NEW_USER = 'NEW_USER',
//   IMPORT_CSV = 'IMPORT_CSV',
// }

// export type TUserCreateOptions = keyof typeof UserCreateOptions;

// TODO: will we need uuid (in messenger) ?
export interface Product {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  brand?: string;
  sku?: string;
  images?: string[];
  groups?: string[];
}

export type ProductCreatePayload = Pick<
Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'groups'
> & {
  sendActivationEmail: boolean;
};

export type ProductUpdatePayload = Pick<
  Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'groups'
>;

type ProductQueryBase = {
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

export type ProductQueryPayload = Partial<ProductQueryBase>;

// export type UserSettingsPayload = Pick<
//   User,
//   'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'defaultPrivacyLevel'
// >;

// export type LoginPayload = Pick<Product, 'email'> & {
//   password: string;
// };

// export type LoginResponse = {
//   token: string;
//   refreshToken: string;
//   tokenType: string;
// };

// export type FormType = 'core' | 'profile';

// export type RegisterPayload = Pick<User, 'username' | 'password' | 'firstName' | 'lastName'>;
export type AllProductsQueryPayload = {
  search: string;
  // role?: UserRole;
};
