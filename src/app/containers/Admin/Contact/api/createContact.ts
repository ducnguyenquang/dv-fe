// import axios from 'utils/axios';

import { ContactCreatePayload } from "models/contact";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createContact = async (contact: ContactCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createContactApi)
  const data = await api.post(contact);
  return data;
};