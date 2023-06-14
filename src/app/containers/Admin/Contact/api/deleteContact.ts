import { ContactDetailPayload } from 'models/contact';
import BaseService from 'services/api/baseApi';
import endPoint from 'services/api/endPoint.json';

export const deleteContact = async (contact: ContactDetailPayload): Promise<any> => {
  if (contact) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getContactApi}/remove/${contact}`);
    const data = await api.get(contact);
    return data;
  } else {
    return null;
  }
};
