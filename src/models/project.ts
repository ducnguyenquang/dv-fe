
import type { UploadFile } from 'antd/es/upload/interface';
import { Brand } from './brand';

import { Category } from "./category";

export interface Project {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  summary?: string;
  // images?: UploadFile[];
  images?: any;
  _id?: string;
}

export type RangeNumber = {
  min?: number,
  max?: number,
}

export type ProjectFilters = {
  brands?: string[];
  review?: number;
  pricing?: number[];
}

export type ProjectCreatePayload = Pick<
Project,
  'name' | 'slug' | 'description' | 'images' | 'summary'
> & {
  sendActivationEmail: boolean;
};

export type ProjectUpdatePayload = Pick<
  Project,
  'name' | 'slug' | 'description' | 'images' | 'summary'
>;

type ProjectQueryBase = {
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

export type ProjectQueryPayload = Partial<ProjectQueryBase>;

export type ProjectDetailPayload = Pick<Project, 'id'> & {
  category?: string;
  _id?: string;
};

export type ProjectDeletePayload = Pick<Project, 'id'>;

export type AllProjectsQueryPayload = {
  search: string;
};


