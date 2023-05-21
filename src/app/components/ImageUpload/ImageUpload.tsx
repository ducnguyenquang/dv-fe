import { UploadProps, Upload, UploadFile } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { ImageUploadProps } from './ImageUpload.types';

const ImageUpload = ({ imageNumber, fileList, setFileList, ratio, className }: ImageUploadProps): JSX.Element => {
  const intl = useIntl();

  const getSrcFromFile = (file: any) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  const onPreview = async (file: UploadFile) => {
    const src = file.url || ((await getSrcFromFile(file)) as string);
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileList((prev: any) => [...prev, { ...file, url: reader.result }]);
      };
      return false;
    },
    listType: 'picture-card',
    fileList,
  };

  return (
    <ImgCrop rotationSlider showGrid showReset fillColor={'transparent'} aspect={ratio ? ratio : 1 / 1} aspectSlider minZoom={0}>
      <Upload className={className} {...props} onPreview={onPreview}>
        {fileList?.length < imageNumber && `+ ${intl.formatMessage({ id: 'product.button.addImages' })}`}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
