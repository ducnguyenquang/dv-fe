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
import './UserDetailForm.less';
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
    <div className="signup">
      <Helmet title={intl.formatMessage({ id: 'page.name.userDetail' })} />
      {/* <Card
        title={intl.formatMessage({ id: 'page.name.userDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => (window.history.back())}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      > */}
      <h1 className="header">{intl.formatMessage({ id: 'page.name.signup' })}</h1>
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
          name="lastName"
          label={intl.formatMessage({ id: 'signup.lastName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.lastName' }) }
              ),
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstName"
          label={intl.formatMessage({ id: 'signup.firstName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.firstName' }) }
              ),
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={intl.formatMessage({ id: 'signup.username' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.email' }) }
              ),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'signup.validation.invalid.email' }),
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={intl.formatMessage({ id: 'signup.password' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.password' }) }
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={intl.formatMessage({ id: 'signup.confirmPassword' })}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.password' }) }
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(intl.formatMessage({ id: 'signup.validation.invalid.confirmPassword' }))
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label={intl.formatMessage({ id: 'signup.phone' })}
          hasFeedback
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.phone' }) }
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate {...tailFormItemLayout}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0
              }
            >
              {intl.formatMessage({ id: 'common.button.signup' })}
            </Button>
          )}
        </Form.Item>
      </Form>
      {/* </Card> */}
    </div>
  );
};

export default UserDetailForm;
