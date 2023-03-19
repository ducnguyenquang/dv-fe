// import type { UploadFile } from 'antd/es/upload/interface';

export interface RoutePath {
  id?: string;
  name?: string;
  subject?: string;
  body?: string;
  _id?: string;
}

export type RoutePathCreatePayload = Pick<RoutePath, 'name' | 'subject' | 'body'>;

export type RoutePathUpdatePayload = Pick<RoutePath, 'name' | 'subject' | 'body'>;

type RoutePathQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: any;
  search?: any;
};

export type RoutePathQueryPayload = Partial<RoutePathQueryBase>;

export type RoutePathDetailPayload = Pick<RoutePath, 'id'> & {
  _id?: string;
};

export type RoutePathDeletePayload = Pick<RoutePath, 'id'>;

export type AllRoutePathsQueryPayload = {
  search: string;
};
