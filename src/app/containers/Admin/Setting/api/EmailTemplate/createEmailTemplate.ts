// import axios from 'utils/axios';

import { EmailTemplateCreatePayload } from "models/emailTemplate";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createEmailTemplate = async (emailTemplate: EmailTemplateCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createEmailTemplateApi)
  const data = await api.post(emailTemplate);
  return data;
};