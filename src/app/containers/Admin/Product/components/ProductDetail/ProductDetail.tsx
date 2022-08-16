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
import { productsActions, productsHooks, productsSelectors } from 'app/containers/Admin/Product';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import endPoint from 'services/api/endPoint.json';

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

const ProductDetail = (): JSX.Element => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isUpdate = id ? true : false;

  const { mutateAsync: updateProduct, isLoading: isLoadingUpdateProduct } = productsHooks.useUpdateProduct();
  const { mutateAsync: createProduct, isLoading: isLoadingCreateProduct } = productsHooks.useCreateProduct();

  console.log('==== id', id);

  // console.log('==== category', category)

  // props.match.params.genreId,

  // const suffixSelector = (
  //   <Form.Item name="suffix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="USD">$</Option>
  //       <Option value="CNY">¥</Option>
  //     </Select>
  //   </Form.Item>
  // );
  // let [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Array<any>>([]);
  const [productDetail, setProductDetail] = useState<Product>({});

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const productDetailParam = useSelector(productsSelectors.getProduct);

  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });
  // productsSelectors.getProduct()
  const { data: productDetailData, isLoading: isLoadingProductDetail } = productsHooks.useProduct({ id });
  console.log('==== productDetailParam', productDetailParam);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    if (isUpdate) {
      await updateProduct({
        ...values,
        _id: productDetailData?._id,
        images: fileList,
        categories: values.categories.map((item: any) => item.value),
      }).then((item: any) => {
        console.log('==== updateProduct productDetail', item);

        setProductDetail(item.data);
      });
      // await productsHooks.useUpdateProduct(values)
    } else {
      await createProduct(values).then((item: any) => {
        console.log('==== createProduct productDetail', item);

        setProductDetail(item.data);
      });
    }
  };
  // const productDetail = productsSelectors.getProduct();

  useEffect(() => {
    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData);
    }
  }, [categoriesData, isLoadingCategories]);

  useEffect(() => {
    if (productDetailData && !isLoadingProductDetail) {
      // console.log('==== productDetailData', productDetailData)
      setProductDetail(productDetailData);
      setFileList(productDetailData?.images);
    }
  }, [productDetailData, isLoadingProductDetail]);

  // console.log('==== categories', categories)
  // console.log('==== isUpdate', isUpdate);
  const initialValues = {
    ...productDetail,
    categories: productDetail?.categories?.map(item => {
      return { value: item._id, label: item.name };
    }),
  };
  // console.log('==== initialValues', initialValues);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach(file => {
  //     formData.append('files[]', file as RcFile);
  //   });
  //   // setUploading(true);
  //   // You can use any AJAX library you like
  //   fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(res => res.json())
  //     .then(() => {
  //       setFileList([]);
  //   console.log('upload successfully.');

  //       // message.success('upload successfully.');
  //     })
  //     .catch(() => {
  //   console.log('upload failed.');
  //     })
  //     .finally(() => {
  //       // setUploading(false);
  //     });
  // };

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
      console.log('==== initialValues', initialValues)

  return (
    productDetail ? (
      <Form
        {...formItemLayout}
        form={form}
        name="update"
        onFinish={onFinish}
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
          <Input.TextArea showCount maxLength={100} value={productDetail?.description} />
        </Form.Item>

        <Form.Item name="categories" label="Categories">
          <Select allowClear mode="multiple" placeholder="select Product Categories">
            {categories &&
              categories.map(item => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="Images">
          <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            {/* <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger> */}

            <ImgCrop rotate>
              <Upload
                // action={`${endPoint.backendUrl}${endPoint.uploadImages}`}
                {...props}
                listType="picture-card"
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Select File'}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoadingUpdateProduct || isLoadingCreateProduct}>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Form.Item>

        {productDetail?.images?.map((item: any) => (
          <ImageAntd
            key={item.uid}
            width={200}
            height={200}
            // src="error"
            src={item.thumbUrl}
          />
        ))}
      </Form>
    ) : <Form
    {...formItemLayout}
    form={form}
    name="add"
    onFinish={onFinish}
    // initialValues={productDetail ? initialValues : undefined}
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
      <Input.TextArea showCount maxLength={100} />
    </Form.Item>

    <Form.Item name="categories" label="Categories">
      <Select allowClear mode="multiple" placeholder="select Product Categories">
        {categories &&
          categories.map(item => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
      </Select>
    </Form.Item>

    <Form.Item label="Images">
      <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
        {/* <Upload.Dragger name="files" action="/upload.do">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Upload.Dragger> */}

        <ImgCrop rotate>
          <Upload
            // action={`${endPoint.backendUrl}${endPoint.uploadImages}`}
            {...props}
            listType="picture-card"
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Select File'}
          </Upload>
        </ImgCrop>
      </Form.Item>
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit" loading={isLoadingUpdateProduct || isLoadingCreateProduct}>
        {isUpdate ? 'Update' : 'Add'}
      </Button>
    </Form.Item>
  </Form>
  );
};

export default ProductDetail;
