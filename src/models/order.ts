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
import { Customer } from './customer';
import { Product } from './product';

export interface OrderItem {
  id?: string;
  quantity: number;
  total: number;
  order?: Order;
  product?: Product;
  createdBy?: string;
  _id?: string;
}

export interface Order {
  id?: string;
  total?: string;
  customer?: Customer;
  orderItems?: OrderItem[];
  orderNumber?: string;
  payment?: string;
  status?: string;
  note?: string;
  // customer: {type: mongoose.Schema.ObjectId, ref: 'customer'},
}

export type OrderCreatePayload = Pick<
  Order,
  'total' | 'orderItems' | 'orderNumber' | 'payment' | 'status' | 'note' | 'customer'
> & {};

export type OrderUpdatePayload = Pick<
  Order,
  'total' | 'orderItems' | 'orderNumber' | 'payment' | 'status' | 'note' | 'customer'
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

// export type LoginPayload = Pick<Order, 'email'> & {
//   password: string;
// };

export type OrderDetailPayload = Pick<Order, 'id'> & {
  _id?: string;
};

export type OrderDeletePayload = Pick<Order, 'id'>;

export type AllOrdersQueryPayload = {
  search: string;
  // role?: UserRole;
};
