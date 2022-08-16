import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Image as ImageAntd,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productsHooks, productsSelectors, productsActions } from 'app/containers/Admin/Product';
// import { productsSelectors } from '../../../../redux/selectors';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import endPoint from 'services/api/endPoint.json';
// import { productsActions } from 'app/containers/Admin';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps {
  isUpdate?: boolean;
  onFinish?: any;
  initialValues?: any;
  isLoading?: boolean;
  categories?: Category[];
}

const ProductDetailForm = ({ isUpdate, onFinish, initialValues, isLoading, categories }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  // const { id } = useParams();
  // const isUpdate = id ? true : false;
  const productDetailParam = useSelector(productsSelectors.getProduct);

  console.log('==== productDetailParam', productDetailParam);
  const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.images : []);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    listType: 'picture-card',
    fileList,
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  console.log('==== initialValues', initialValues);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="update"
      onFinish={(values) => onFinish({
        ...values,
        images: fileList,
      })}
      initialValues={initialValues}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[
          {
            required: true,
            message: 'Please input Product Name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Slug"
        rules={[
          {
            required: true,
            message: 'Please input Product Slug',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="brand"
        label="Brand"
        rules={[
          {
            required: true,
            message: 'Please input Product Brand',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please input Intro',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} value={initialValues?.description} />
      </Form.Item>

      <Form.Item name="categories" label="Categories">
        <Select key='categorySelect' allowClear mode="multiple" placeholder="select Product Categories">
          {categories &&
            categories.map((item: any) => (
              <Option key={item?._id} value={item?._id}>
                {item?.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Images">
        <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <ImgCrop rotate>
            <Upload
              // action={`${endPoint.backendUrl}${endPoint.uploadImages}`}
              {...props}
              listType="picture-card"
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList?.length < 5 && '+ Select File'}
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {isUpdate ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductDetailForm;
