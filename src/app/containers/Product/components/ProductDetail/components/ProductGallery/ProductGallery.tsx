import { Carousel, Image } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React from 'react';

const contentStyle: React.CSSProperties = {
  height: '436px',
  color: '#fff',
  background: '#fff',

};

interface IProps {
  images?: UploadFile[];
}


const ProductGallery = ({ images }: IProps): JSX.Element => {
  return (
    <Carousel autoplay>
      {images?.map(item => {
        return (
          <div>
            <h3>
              <Image
                key={item.uid}
                preview={false}
                width={'100%'}
                height={'100%'}
                src={item?.thumbUrl}
                className='image'
              />
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductGallery;
