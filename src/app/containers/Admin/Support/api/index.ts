import { SupportQueryPayload, SupportDetailPayload } from 'models/support';
import { getSupport } from './getSupport';
import { createSupport } from './createSupport';
import { updateSupport } from './updateSupport';
import { getSupports } from './getSupports';
import { deleteSupport } from './deleteSupport';

export const supportsKeys = {
  all: ['supports'] as const,
  details: () => [...supportsKeys.all, 'detail'] as const,
  detail: (params: SupportDetailPayload) => [...supportsKeys.details(), { params }] as const,
  lists: () => [...supportsKeys.all, 'list'] as const,
  list: (params: SupportQueryPayload) => [...supportsKeys.lists(), { params }] as const,
};

export const supportsApi = {
  supportsKeys,
  getSupports,
  getSupport,
  createSupport,
  updateSupport,
  deleteSupport,
};
