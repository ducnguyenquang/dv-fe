import { Button, Card, Form, Input, Select, Upload } from 'antd';
import { ROLE_DROPDOWN_OPTIONS } from 'constants/user';
import { useCallback, useEffect, useState } from 'react';
import { usersHooks } from 'app/containers/Admin/User';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { User } from 'models/user';
import './UserAccount.less';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';

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

const UserAccount = (): JSX.Element => {
  const [form] = Form.useForm();
  const currentUserData: any = localStorage.getItem('CurrentUser')
  const [currentUser, setCurrentUser] = useState<User>();
  const intl = useIntl();
  const navigate = useNavigate();
  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } = usersHooks.useUpdateUser();
  const [fileList, setFileList] = useState<UploadFile[]>(currentUser?.images ? currentUser?.images : []);

  const onFinish = useCallback(async (values: any) => {
    await updateUser({
      ...values,
      _id: currentUser?._id,
    }).then((item: any) => {
      setCurrentUser(item?.data);
      setFileList(item?.data?.images);
      localStorage.setItem('CurrentUser', JSON.stringify(item?.data))
    });
  }, [updateUser, currentUser]);

  useEffect(() => {
    if (currentUserData && !currentUser) {
      const user = JSON.parse(currentUserData)
      setCurrentUser(user);
      setFileList(user?.images);
    }
  }, [currentUser, currentUserData]);


  return (
    <div className='adminInformation'>
      <Helmet title={intl.formatMessage({ id: 'page.name.setting.information' })} />
      {/* <Card
        title={intl.formatMessage({ id: 'page.name.setting.information' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/`)}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      > */}
        {currentUser && <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async values =>
            await onFinish({
              ...values,
              images: fileList,
            })
          }
          initialValues={currentUser}
          scrollToFirstError
        >
          <Form.Item className='upload'>
            <ImageUpload fileList={fileList} setFileList={setFileList} imageNumber={1} />
          </Form.Item> 
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

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoadingUpdateUser}>
              {intl.formatMessage({ id: 'common.button.update' })}
            </Button>
          </Form.Item>
        </Form>}
      {/* </Card> */}
    </div>
  );
};

export default UserAccount;
