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
  Card,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productsHooks, productsSelectors, productsActions } from 'app/containers/Admin/Product';
// import { productsSelectors } from '../../../../redux/selectors';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import endPoint from 'services/api/endPoint.json';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import ReactQuill, { Quill } from 'react-quill';
import QuillBetterTable from 'quill-better-table';
// import { Parser as HtmlToReactParser } from "html-to-react";
import 'react-quill/dist/quill.snow.css';
import { brandsHooks } from 'app/containers/Admin/Brand';
import { Brand } from 'models/brand';
// import { productsActions } from 'app/containers/Admin';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

// import "react-quill-with-table/dist/quill.snow.css";
// import "react-quill-with-table/dist/quill.bubble.css";

// var htmlToReactParser = new HtmlToReactParser();

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

// Quill.register({
//   'modules/better-table': QuillBetterTable
// }, true);

// const editorModules = {
//   table: false, // disable table module
//   "better-table": {
//     operationMenu: {
//       items: {
//         unmergeCells: {
//           text: "Another unmerge cells name"
//         }
//       }
//     }
//   },
//   keyboard: {
//     bindings: QuillBetterTable.keyboardBindings
//   }
// };

const ProductDetailForm = ({ isUpdate, onFinish, initialValues, isLoading, categories }: IProps): JSX.Element => {
  // const editor = useRef();
  const intl = useIntl();

  const dispatch = useDispatch();

  const [text, setText] = useState('');
  // var reactElement = HtmlToReactParser.parse(text);
  // useEffect(() => {
  //   const editon = editor.current.getEditor();
  //   //console.log(editon.getModule("toolbar"));
  //   let tableModule = editon.getModule("better-table");
  //   tableModule.insertTable(3, 3);
  //   console.log(tableModule);
  // }, []);

  const [form] = Form.useForm();
  // const { id } = useParams();
  // const isUpdate = id ? true : false;
  const [description, setDescription] = useState('');
  const [specification, setspecification] = useState('');

  const productDetailParam = useSelector(productsSelectors.getProduct);

  const [brands, setBrands] = useState<Brand[]>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
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

  // useEffect(() => {
  //   const editon = editor.current.getEditor();
  //   //console.log(editon.getModule("toolbar"));
  //   let tableModule = editon.getModule("better-table");
  //   tableModule.insertTable(3, 3);
  //   console.log(tableModule);
  // }, []);
  console.log('==== brands', brands);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.productDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.productDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => window.history.back()}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={values =>
            {
              // console.log('==== onFinish values', values); return;
              onFinish({
              ...values,
              description: encodeURIComponent(values.description),
              specification: encodeURIComponent(values.specification),
              slug: encodeURIComponent(values.slug),
              images: fileList,
            })}
          }
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
            <ReactQuill
              // ref={editor}
              theme="snow"
              value={description}
              // value={text}

              onChange={setDescription}
              // onChange={(value) => setText(value)}

              // modules={editorModules}
            />
            {/* {reactElement} */}
          </Form.Item>
          <Form.Item name="specification" label={intl.formatMessage({ id: 'product.specification' })}>
            {/* <Input.TextArea showCount maxLength={100} value={initialValues?.description} /> */}
            <ReactQuill
              // ref={editor}
              theme="snow"
              value={specification}
              // value={text}

              onChange={setDescription}
              // onChange={(value) => setText(value)}

              // modules={editorModules}
            />
            {/* {reactElement} */}
          </Form.Item>

          <Form.Item name="categories" label={intl.formatMessage({ id: 'product.categories' })}>
            <Select
              key="categorySelect"
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
    </>
  );
};

export default ProductDetailForm;
