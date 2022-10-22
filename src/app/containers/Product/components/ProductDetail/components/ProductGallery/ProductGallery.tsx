import { Carousel, Image } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React from 'react';

const contentStyle: React.CSSProperties = {
  // height: '160px',
  // color: '#fff',
  // lineHeight: '160px',
  // textAlign: 'center',
  // background: '#364d79',
  height: '436px',
  // width: ;
  color: '#fff',
  // lineHeight: '160px',
  // textAlign: 'center',
  // background: '#364d79',
  background: '#fff',

};

interface IProps {
  images?: UploadFile[];
}


const ProductGallery = ({ images }: IProps): JSX.Element => {
  console.log('==== images', images)

  return (
    <Carousel autoplay>
      {images?.map(item => {
        return (
          <div>
            <h3>
              <Image
                key={item.uid}
                preview={false}
                // style={contentStyle}
                width={400}
                height={400}
                src={item?.thumbUrl}
                className='image'
                // style={contentStyle}
              />
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductGallery;
