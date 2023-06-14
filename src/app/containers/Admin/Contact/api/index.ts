import { ContactQueryPayload, ContactDetailPayload } from 'models/contact';

import { getContacts } from './getContacts';
import { getContact } from './getContact';
import { createContact } from './createContact';
import { updateContact } from './updateContact';
import { deleteContact } from './deleteContact';

export const contactsKeys = {
  all: ['contacts'] as const,
  details: () => [...contactsKeys.all, 'detail'] as const,
  detail: (params: ContactDetailPayload) => [...contactsKeys.details(), { params }] as const,
  lists: () => [...contactsKeys.all, 'list'] as const,
  list: (params: ContactQueryPayload) => [...contactsKeys.lists(), { params }] as const,
};

export const contactsApi = {
  contactsKeys,
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
