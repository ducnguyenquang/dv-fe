// import axios from 'utils/axios';

import { ContactQueryPayload } from "models/contact";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getContacts = async (contact: ContactQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getContactsApi)
  const { data } = await api.post(contact);
  return data;
};