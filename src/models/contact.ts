
// import type { UploadFile } from 'antd/es/upload/interface';
// import { Brand } from './brand';

// import { Category } from "./category";

export interface Contact {
  id?: string;
  name?: string;
  city?: string;
  ward?: string;
  address?: string;
  topic?: string;
  description?: string;
  _id?: string;
}

export type RangeNumber = {
  min?: number,
  max?: number,
}

export type ContactFilters = {
  brands?: string[];
  review?: number;
  pricing?: number[];
}

export type ContactCreatePayload = Pick<
Contact,
  'name' | 'city' | 'ward' | 'address' | 'topic' | 'description'
> & {
  sendActivationEmail: boolean;
};

export type ContactUpdatePayload = Pick<
  Contact,
  'name' | 'city' | 'ward' | 'address' | 'topic' | 'description'
>;

type ContactQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    // id: string;
    // desc: boolean;
  };
  search?: {};
  roles?: string[];
  states?: string[];
};

export type ContactQueryPayload = Partial<ContactQueryBase>;

export type ContactDetailPayload = Pick<Contact, 'id'> & {
  // category?: string;
  _id?: string;
};

export type ContactDeletePayload = Pick<Contact, 'id'>;

export type AllContactsQueryPayload = {
  search: string;
};


