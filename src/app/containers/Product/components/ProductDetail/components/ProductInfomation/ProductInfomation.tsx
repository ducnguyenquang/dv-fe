import { Descriptions, Form, InputNumber, Rate, Tabs } from 'antd';
import { productsHooks, productsSelectors } from 'app/containers/Admin/Product';
import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductGallery from '../ProductGallery/ProductGallery';
import './ProductInfomation.less'
const { TabPane } = Tabs;

const ProductInfomation = (): JSX.Element => {
  const intl = useIntl();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<Product>({});

  const { data: productDetailData, isLoading: isLoadingProductDetail } = productsHooks.useProduct({ id });

  useEffect(() => {
    if (productDetailData && !isLoadingProductDetail) {
      // console.log('==== productDetailData', productDetailData)
      setProductDetail(productDetailData);
    }
  }, [isLoadingProductDetail, productDetailData]);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='productInfo'>
      <div className='productInfoBlock'>
        <div className='carousel'>
          <ProductGallery images={productDetail?.images}/>
        </div>
        <Descriptions className='information' title={productDetail?.name}>
          <Descriptions.Item span={3}>
            <Rate />
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'product.sku' })}>{productDetail?.sku}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'product.brand' })} span={2}>
            {productDetail?.brand}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'product.categories' })}>{productDetail?.categories?.map(item => item.name)}</Descriptions.Item>
        </Descriptions>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputNumber min="1" max="10" defaultValue="3" onChange={onChange} />
          </Form.Item>
        </Form>
      </div>
      <Tabs className='tabs' defaultActiveKey="1" onChange={onChange}>
        <TabPane tab={intl.formatMessage({ id: 'product.detail' })} key="1">
          {productDetail?.description}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductInfomation;
