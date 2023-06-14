// import axios from 'utils/axios';

import { ContactDetailPayload } from "models/contact";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getContact = async (contact: ContactDetailPayload): Promise<any> => {
  if(contact.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getContactApi}/${contact.id}`)
    const data = await api.get(contact);
    return data;
  } else {
    return null;
  }
};