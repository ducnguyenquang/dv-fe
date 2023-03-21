import { UserDetailPayload } from 'models/user';
import BaseService from 'services/api/baseApi';
import endPoint from 'services/api/endPoint.json';

export const deleteUser = async (user: UserDetailPayload): Promise<any> => {
  if (user) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getUserApi}/remove/${user}`);
    const data = await api.get(user);
    return data;
  } else {
    return null;
  }
};
