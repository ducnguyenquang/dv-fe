

import { Customer } from "./customer";
import { OrderItem } from './order';

export interface Cart {
  total?: number;
  customer?: Customer;
  orderItems?: OrderItem[];
  payment?: string;
  note?: string;
}
