import { Image } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React, { useCallback, useEffect, useState } from 'react';
import './ProjectGallery.less';

interface IProps {
  images?: UploadFile[];
}

const ProjectGallery = ({ images }: IProps): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);

  useEffect(() => {
    if (images && images?.length > 0) {
      setSelectedImage(images?.[0]);
    }
  }, [images]);

  const onImageClick = useCallback((item: any) => {
    setSelectedImage(item)
  }, [])

  return (
    <div className="projectGallery">
      <Image
        key={selectedImage?.uid}
        preview={false}
        src={selectedImage?.url || '/images/no-image.png'}
        className="selectedImage"
      />
      <div className="images">
        {images?.map(item => {
          return <Image key={item.uid} preview={false} src={item?.url} className="image" onClick={() => onImageClick(item)} />;
        })}
      </div>
    </div>
  );
};

export default ProjectGallery;
