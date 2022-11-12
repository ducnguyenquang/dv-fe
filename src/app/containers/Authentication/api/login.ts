// import axios from 'utils/axios';

import { LoginPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

// const API_KARCHER_EQUIPMENT =
//   'https://globalweb-webservice.app.kaercher.com/api/v2/shared/product';
export const login = async (user: LoginPayload): Promise<any> => {
  // Get the presigned URL
  // const { materialNumber, keys } = equipment;
  // const normalizedMaterialNum = materialNumber.replace(/\.|-/g, '');
  // const accessKey = '9CE8183C39423C31';
  // const locale = 'en-US';
  // const include = keys || 'documents,images';
  // const { data } = await axios({
  //   method: 'GET',
  //   url: `${API_KARCHER_EQUIPMENT}/${normalizedMaterialNum}?accessKey=${accessKey}&locale=${locale}&include=${include}`,
  // });
  const api = new BaseService(endPoint.backendUrl, endPoint.loginApi)
  // console.log('==== login api', api)

  const data = api.post(user, {})
  // console.log('==== login data', data)
  return {
    data: data,
  };
};

// const API_KARCHER_EQUIPMENT =
//   'https://globalweb-webservice.app.kaercher.com/api/v2/shared/product';
// export const getProducts = async (equipment: { materialNumber: string; keys?: string }): Promise<any> => {
//   // Get the presigned URL
//   const { materialNumber, keys } = equipment;
//   const normalizedMaterialNum = materialNumber.replace(/\.|-/g, '');
//   const accessKey = '9CE8183C39423C31';
//   const locale = 'en-US';
//   const include = keys || 'documents,images';
//   const { data } = await axios({
//     method: 'GET',
//     url: `${API_KARCHER_EQUIPMENT}/${normalizedMaterialNum}?accessKey=${accessKey}&locale=${locale}&include=${include}`,
//   });

//   return {
//     data: data.result,
//   };
// };
