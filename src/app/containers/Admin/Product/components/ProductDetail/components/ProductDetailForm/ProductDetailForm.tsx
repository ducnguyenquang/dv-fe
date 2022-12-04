import { Button, Form, Input, Select, Upload, Card } from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsHooks, productsSelectors } from 'app/containers/Admin/Product';
// import { productsSelectors } from '../../../../redux/selectors';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
// import ReactQuill from 'react-quill-with-table';
// import { Parser as HtmlToReactParser } from "html-to-react";
import 'react-quill/dist/quill.snow.css';
import { brandsHooks } from 'app/containers/Admin/Brand';
import { Brand } from 'models/brand';
import { TYPE_OPTIONS } from 'constants/type';
// import Editor from 'app/components/Editor/Editor';
// import Editor from 'app/components/Editor/EditorWithTable';
import Editor from 'app/components/Editor/CkEditor';


import './ProductDetailForm.less';

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
  // categories?: Category[];
}

const ProductDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const [form] = Form.useForm();
  // const { id } = useParams();
  // const isUpdate = id ? true : false;
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [search, setSearch] = useState({
    type: initialValues?.type,
  });

  const productDetailParam = useSelector(productsSelectors.getProduct);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // const [page, setPage] = React.useState(PAGE);
  // const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    search: search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { data: brandsData, isLoading: isLoadingBrandsData } = brandsHooks.useBrands({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.images : []);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (brandsData && !isLoadingBrandsData) {
      // console.log('==== data.data 111', data);
      setBrands(brandsData.data);
    }
  }, [brandsData, isLoadingBrandsData]);

  useEffect(() => {
    // console.log('==== useEffect data', data)
    // console.log('==== useEffect isLoading', isLoading)

    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData, isLoadingCategories]);

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

  const onSelectedType = (value: string) => {
    console.log('==== onSelectedType value', value);
    const searchData = {
      type: value,
    };
    setSearch(searchData);
  };

  return (
    <div className='productDetailForm'>
      <Helmet title={intl.formatMessage({ id: 'page.name.productDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.productDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => window.location.href='/admin/products'}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={values => {
            // console.log('==== onFinish values', values); return;
            onFinish({
              ...values,
              description: encodeURIComponent(values.description),
              specification: encodeURIComponent(values.specification),
              slug: encodeURIComponent(values.slug),
              images: fileList,
            });
            window.location.href='/admin/products';
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'product.productName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.productName' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'product.slug' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.slug' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label={intl.formatMessage({ id: 'product.brand' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.brand' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select allowClear placeholder={intl.formatMessage({ id: 'product.brand.placeholder' })}>
              {brands &&
                brands?.map((item: Brand) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="summary" label={intl.formatMessage({ id: 'product.summary' })}>
            <Input.TextArea showCount maxLength={100} value={initialValues?.summary} />
          </Form.Item>

          <Form.Item name="description" label={intl.formatMessage({ id: 'product.description' })}>
            {/* <Input.TextArea showCount maxLength={100} value={initialValues?.description} /> */}
            {/* <ReactQuill
              // ref={editor}
              theme="snow"
              value={description}
              // value={text}

              onChange={setDescription}
              // onChange={(value) => setText(value)}

              // modules={editorModules}
            /> */}
            <Editor value={description} onChange={setDescription} />
            {/* <div id="table"></div> */}
            {/* {reactElement} */}
          </Form.Item>
          <Form.Item name="specification" label={intl.formatMessage({ id: 'product.specification' })}>
            {/* <Input.TextArea showCount maxLength={100} value={initialValues?.description} /> */}
            {/* <ReactQuill
              // ref={editor}
              theme="snow"
              value={specification}
              // value={text}

              onChange={setDescription}
              // onChange={(value) => setText(value)}

              // modules={editorModules}
            /> */}
            {/* {reactElement} */}
            <Editor value={specification} onChange={setSpecification} />
          </Form.Item>
          <Form.Item name="type" label={intl.formatMessage({ id: 'product.type' })}>
            <Select
              // key="TypeSelect"
              allowClear
              placeholder={intl.formatMessage({ id: 'product.type.placeholder' })}
              onChange={value => onSelectedType(value)}
            >
              {TYPE_OPTIONS.map((item: any) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="categories" label={intl.formatMessage({ id: 'product.categories' })}>
            <Select
              // key="categorySelect"
              allowClear
              mode="multiple"
              placeholder={intl.formatMessage({ id: 'product.categories.placeholder' })}
            >
              {categories &&
                categories.map((item: any) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label={intl.formatMessage({ id: 'product.images' })}>
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <ImgCrop rotate>
                <Upload
                  // action={`${endPoint.backendUrl}${endPoint.uploadImages}`}
                  {...props}
                  listType="picture-card"
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList?.length < 5 && `+ ${intl.formatMessage({ id: 'product.button.addImages' })}`}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isUpdate
                ? intl.formatMessage({ id: 'common.button.update' })
                : intl.formatMessage({ id: 'common.button.add' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductDetailForm;
