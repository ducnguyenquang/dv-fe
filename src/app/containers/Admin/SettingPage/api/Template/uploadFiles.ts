// import axios from 'utils/axios';

import { CommonUploadFilesPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const uploadFiles = async (template: CommonUploadFilesPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.uploadFilesCommonApi)
  const data = await api.post(template);
  return data;
};