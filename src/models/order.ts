// export enum UserRole {
//   CUSTOMER = 'CUSTOMER',
//   MANAGER = 'MANAGER',
//   ADMIN = 'ADMIN',
// }

// export enum UserStatus {
//   PENDING = 'PENDING',
//   ACTIVED = 'ACTIVED',
//   REJECTED = 'REJECTED',
// }
import { Product } from './product';

export interface OrderItem {
  id?: string;
  quantity?: string;
  total?: string;
  order?: Order;
  product?: Product;
  createdBy?: string;
}

export interface Order {
  id?: string;
  email?: string;
  total?: string;
  orderItems?: OrderItem[];
  orderNumber?: string;
  createdBy?: string;
}

export type OrderCreatePayload = Pick<
  Order,
  'email' | 'total' | 'orderItems' | 'orderNumber' | 'createdBy'
> & {
};

export type OrderUpdatePayload = Pick<
  Order,
  'id' | 'email' | 'total' | 'orderItems' | 'orderNumber' | 'createdBy'
>;

type OrderQueryBase = {
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

export type OrderQueryPayload = Partial<OrderQueryBase>;

export type LoginPayload = Pick<Order, 'email'> & {
  password: string;
};

export type OrderDetailPayload = Pick<
  Order, 
  'id' | 'email' | 'total' | 'orderItems' | 'orderNumber' | 'createdBy'> & {
  _id?: string;
};

export type OrderDeletePayload = Pick<Order, 'id'>;

export type AllOrdersQueryPayload = {
  search: string;
  // role?: UserRole;
};
