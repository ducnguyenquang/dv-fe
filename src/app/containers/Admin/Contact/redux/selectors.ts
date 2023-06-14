import type { RootState } from 'config/configureStore';
import { TPagination } from 'models/pagination';

const getContactsPagination = (state: RootState): TPagination => state.adminContacts.pagination;
const getContacts = (state: RootState): TPagination => state.adminContacts.contacts;
const getContact = (state: RootState) => state.adminContacts.contactDetail;
const getIsLoading = (state: RootState): Boolean => state.adminContacts.isLoading;

export const contactsSelectors = {
  getContactsPagination,
  getContacts,
  getIsLoading,
  getContact,
};
