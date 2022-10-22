// import axios from 'utils/axios';

import { EmailTemplateUpdatePayload } from "models/emailTemplate";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateEmailTemplate = async (emailTemplate: EmailTemplateUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateEmailTemplateApi)
  const data = await api.post(emailTemplate);
  return data;
};