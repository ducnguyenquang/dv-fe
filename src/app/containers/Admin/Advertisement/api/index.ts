import { AdvertisementQueryPayload, AdvertisementDetailPayload } from 'models/advertisement';
import { getAdvertisement } from './getAdvertisement';
import { createAdvertisement } from './createAdvertisement';
import { updateAdvertisement } from './updateAdvertisement';
import { getAdvertisements } from './getAdvertisements';
import { deleteAdvertisement } from './deleteAdvertisement';

export const advertisementsKeys = {
  all: ['advertisements'] as const,
  details: () => [...advertisementsKeys.all, 'detail'] as const,
  detail: (params: AdvertisementDetailPayload) => [...advertisementsKeys.details(), { params }] as const,
  lists: () => [...advertisementsKeys.all, 'list'] as const,
  list: (params: AdvertisementQueryPayload) => [...advertisementsKeys.lists(), { params }] as const,
};

export const advertisementsApi = {
  advertisementsKeys,
  getAdvertisements,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
};
