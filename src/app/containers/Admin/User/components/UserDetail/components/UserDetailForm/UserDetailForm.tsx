import { Button, Card, Form, Input, Select, Upload } from 'antd';
import { ROLE_DROPDOWN_OPTIONS } from 'constants/user';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { usersSelectors } from 'app/containers/Admin/User';
// import { productsSelectors } from '../../../../redux/selectors';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
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
  // categories?: Category[];
}

const UserDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  // const { id } = useParams();
  // const isUpdate = id ? true : false;
  const intl = useIntl();

  // const userDetailParam = useSelector(usersSelectors.getUser);

  // console.log('==== productDetailParam', userDetailParam);
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
  // console.log('==== initialValues', initialValues);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.userDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.userDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => (window.history.back())}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={values =>
            onFinish({
              ...values,
              images: fileList,
            })
          }
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="firstName"
            label={intl.formatMessage({ id: 'user.firstName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'user.firstName' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={intl.formatMessage({ id: 'user.lastName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'user.lastName' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={intl.formatMessage({ id: 'user.email' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'user.email' }) }
                ),
              },
              {
                type: 'email',
                message: intl.formatMessage({ id: 'user.validation.invalid.email' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label={intl.formatMessage({ id: 'user.role' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'user.role' }) }
                ),
              },
            ]}
          >
            <Select key="roleSelect" allowClear placeholder={intl.formatMessage({ id: 'user.role.placeholder' })}>
              {ROLE_DROPDOWN_OPTIONS &&
                ROLE_DROPDOWN_OPTIONS.map((item: any) => (
                  <Option key={item?.value} value={item?.value}>
                    {intl.formatMessage({ id: item?.label })}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'user.phone' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'user.phone' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={intl.formatMessage({ id: 'user.images' })}>
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <ImgCrop rotate>
                <Upload
                  // action={`${endPoint.backendUrl}${endPoint.uploadImages}`}
                  {...props}
                  listType="picture-card"
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList?.length < 1 && `+ ${intl.formatMessage({ id: 'user.button.addImages' })}`}
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

export default UserDetailForm;
