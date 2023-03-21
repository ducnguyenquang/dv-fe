import { PageQueryPayload, PageDetailPayload } from 'models/page';
import { getPage } from './getPage';
import { getPages } from './getPages';

export const pagesKeys = {
  all: ['pages'] as const,
  details: () => [...pagesKeys.all, 'detail'] as const,
  detail: (params: PageDetailPayload) => [...pagesKeys.details(), { params }] as const,
  lists: () => [...pagesKeys.all, 'list'] as const,
  list: (params: PageQueryPayload) => [...pagesKeys.lists(), { params }] as const,
};

export const pagesApi = {
  pagesKeys,
  getPages,
  getPage,
};
