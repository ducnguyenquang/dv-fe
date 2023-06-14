// import axios from 'utils/axios';

import { ContactUpdatePayload } from "models/contact";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateContact = async (contact: ContactUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateContactApi)
  const data = await api.post(contact);
  return data;
};