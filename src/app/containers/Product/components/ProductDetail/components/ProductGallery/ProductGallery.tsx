import { Carousel, Image } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React, { useCallback, useEffect, useState } from 'react';
import './ProductGallery.less';

const contentStyle: React.CSSProperties = {
  height: '436px',
  color: '#fff',
  background: '#fff',
};

interface IProps {
  images?: UploadFile[];
}

const ProductGallery = ({ images }: IProps): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  console.log('==== selectedImage', selectedImage);

  useEffect(() => {
    if (images && images?.length > 0) {
      setSelectedImage(images?.[0]);
    }
  }, [images]);

  const onImageClick = useCallback((item: any) => {
    console.log('==== onImageClick item', item);

    setSelectedImage(item);
  }, []);

  return (
    <div className="productGallery">
      <Image key={selectedImage?.uid} preview={false} src={selectedImage?.url || selectedImage?.thumbUrl || '/images/no-image.png'} className="selectedImage" />
      <div className="images">
        {images?.map(item => {
          return (
            <Image
              key={item.uid}
              preview={false}
              src={item?.url || item?.thumbUrl || '/images/no-image.png'}
              className="image"
              onClick={() => onImageClick(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
