import { Carousel, Image } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React from 'react';

const contentStyle: React.CSSProperties = {
  height: '436px',
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
  return (
    <div>
      <Carousel autoplay>
        {images?.map(item => {
          return (
            <div style={contentStyle}>
              <Image
                key={item.uid}
                // style={contentStyle}
                width={contentStyle.height}
                src={item.thumbUrl}
              />
            </div>
          );
        })}

        {/* <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div> */}
      </Carousel>
    </div>
  );
};

export default ProductGallery;
