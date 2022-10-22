// import axios from 'utils/axios';

import { EmailTemplateQueryPayload } from "models/emailTemplate";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getEmailTemplates = async (emailTemplate: EmailTemplateQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getEmailTemplatesApi)
  const { data } = await api.post(emailTemplate);
  return data;
};