import { Button, Form, Input, Select, Upload, Card, Switch, Tooltip } from 'antd';
import { Category } from 'models/category';
import { useEffect, useState } from 'react';
import { productsHooks } from 'app/containers/Admin/Product';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { brandsHooks } from 'app/containers/Admin/Brand';
import { Brand } from 'models/brand';
import { TYPE_OPTIONS } from 'constants/type';
import Editor from 'app/components/Editor/CkEditor';
import './ProductDetailForm.less';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

interface IProps {
  isUpdate?: boolean;
  onFinish?: any;
  initialValues?: any;
  isLoading?: boolean;
}

const ProductDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [search, setSearch] = useState({
    type: initialValues?.type,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    if (brandsData && !isLoadingBrandsData) {
      setBrands(brandsData.data);
    }
  }, [brandsData, isLoadingBrandsData]);

  useEffect(() => {
    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData, isLoadingCategories]);

  const onSelectedType = (value: string) => {
    const searchData = {
      type: value,
    };
    setSearch(searchData);
  };

  console.log('==== initialValues', initialValues);
  console.log('==== brands', brands);

  

  return (
    <div className="productDetailForm">
      <Helmet title={intl.formatMessage({ id: 'page.name.productDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.productDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/products`, { replace: true })}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async values => {
            // console.log('==== onFinish values', values);return;
            
            await onFinish({
              ...values,
              description: encodeURIComponent(values.description),
              specification: encodeURIComponent(values.specification),
              slug: encodeURIComponent(values.slug),
              images: fileList,
            }).then(() => navigate(`/admin/products`, { replace: true }));
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
            <Select id="brand" allowClear placeholder={intl.formatMessage({ id: 'product.brand.placeholder' })}>
              {brands &&
                brands.map((item: any) => (
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
            <Editor value={description} onChange={setDescription} />
          </Form.Item>
          <Form.Item name="specification" label={intl.formatMessage({ id: 'product.specification' })}>
            <Editor value={specification} onChange={setSpecification} />
          </Form.Item>
          <Form.Item name="type" label={intl.formatMessage({ id: 'product.type' })}>
            <Select
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
              id="categories"
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

          <Form.Item
            label={
              <>
                {intl.formatMessage({ id: 'product.images' })}
                <Tooltip title="400*400 (px)">
                  <QuestionCircleOutlined style={{ marginLeft: '1rem', color: '#ccc' }} />
                </Tooltip>
              </>
            }
          >
            <ImageUpload fileList={fileList} ratio={1 / 1} setFileList={setFileList} imageNumber={5} />
          </Form.Item>
          <Form.Item name="isHidden" label={intl.formatMessage({ id: 'product.isHidden' })}>
            <Switch defaultChecked={initialValues?.isHidden} />
          </Form.Item>
          <Form.List name="documents">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    {...formItemLayout}
                    label={index === 0 ? intl.formatMessage({ id: 'product.documents' }) : ' '}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Input placeholder={intl.formatMessage({ id: 'product.documents' })} style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item
                  {...formItemLayout}
                  label={fields.length === 0 ? intl.formatMessage({ id: 'product.documents' }) : ' '}
                >
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    {intl.formatMessage({ id: 'product.button.addDocument' })}
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

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
