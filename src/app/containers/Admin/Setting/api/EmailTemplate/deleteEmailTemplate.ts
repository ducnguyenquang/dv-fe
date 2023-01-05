// import axios from 'utils/axios';

import { EmailTemplateDetailPayload } from "models/emailTemplate";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteEmailTemplate = async (emailTemplate: EmailTemplateDetailPayload): Promise<any> => {
  if(emailTemplate) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeEmailTemplateApi}/${emailTemplate._id}`)
    const data = await api.get(emailTemplate);
    return data;
  } else {
    return null;
  }
};