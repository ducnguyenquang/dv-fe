import { RcFile, UploadFile } from 'antd/lib/upload';

export const getImageToBase64 = async (file: RcFile) => {
  let src = file.name as string;

  const reader = new FileReader();
  reader.readAsText(file as RcFile);
  // reader.readAsDataURL(file.originFileObj as RcFile);
  // reader.readAsBinaryString(file as RcFile)
  reader.onload = () => {
    // setFileBase64(reader.result as string);
    src = reader.result as string;
  };

  // src = await new Promise(resolve => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file as RcFile);
  //   // reader.readAsDataURL(file.originFileObj as RcFile);
  //   // reader.readAsBinaryString(file as RcFile)
  //   reader.onload = () => {
  //     // setFileBase64(reader.result as string);
  //     resolve(reader.result as string);
  //   };
  // });
  // await new Promise(resolve => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file as RcFile);
  //   // reader.readAsDataURL(file.originFileObj as RcFile);
  //   // reader.readAsBinaryString(file as RcFile)
  //   reader.onload = () => {
  //     // setFileBase64(reader.result as string);
  //     resolve(reader.result as string);
  //     src = reader.result as string
  //   };
  // });

  console.log('==== src', src);
  
  return src;
};

