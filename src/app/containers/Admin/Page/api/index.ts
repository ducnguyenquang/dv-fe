import { PageQueryPayload, PageDetailPayload } from 'models/page';
import { getPage } from './getPage';
import { createPage } from './createPage';
import { updatePage } from './updatePage';
import { getPages } from './getPages';
import { deletePage } from './deletePage';

export const pagesKeys = {
  all: ['adminPages'] as const,
  details: () => [...pagesKeys.all, 'detail'] as const,
  detail: (params: PageDetailPayload) => [...pagesKeys.details(), { params }] as const,
  lists: () => [...pagesKeys.all, 'list'] as const,
  list: (params: PageQueryPayload) => [...pagesKeys.lists(), { params }] as const,
};

export const pagesApi = {
  pagesKeys,
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
};
