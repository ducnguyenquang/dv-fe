import { RcFile, UploadFile } from 'antd/lib/upload';

export const getImageToBase64 = async (file: RcFile) => {
  let src = file.name as string;

  const reader = new FileReader();
  reader.readAsText(file as RcFile);
  reader.onload = () => {
    src = reader.result as string;
  };
  
  return src;
};

