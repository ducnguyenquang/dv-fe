// import axios from 'utils/axios';

import { EmailTemplateDeletePayload } from "models/emailTemplate";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteEmailTemplate = async (emailTemplate: EmailTemplateDeletePayload): Promise<any> => {
  if(emailTemplate) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeEmailTemplateApi}/${emailTemplate}`)
    const data = await api.get(emailTemplate);
    return data;
  } else {
    return null;
  }
};