import { Button, Card, Form, Input, Select, Upload } from 'antd';
import { ROLE_DROPDOWN_OPTIONS } from 'constants/user';
import { useCallback, useEffect, useState } from 'react';
import { usersHooks } from 'app/containers/Admin/User';
// import { productsSelectors } from '../../../../redux/selectors';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { User } from 'models/user';
import './Information.less';

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

const Information = (): JSX.Element => {
  const [form] = Form.useForm();
  const currentUserData: any = localStorage.getItem('CurrentUser')
  // const [id, setId] = useState('');
  const [currentUser, setCurrentUser] = useState<User>();

  // const { id } = useParams();
  // const isUpdate = id ? true : false;
  const intl = useIntl();
  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } = usersHooks.useUpdateUser();

  // const userDetailParam = useSelector(usersSelectors.getUser);
  // console.log('==== currentUser', currentUser);

  // const [userDetail, setUserDetail] = useState<User>();
  const [fileList, setFileList] = useState<UploadFile[]>(currentUser?.images ? currentUser?.images : []);
  // const { data: userDetailData, isLoading: isLoadingUserDetail } = usersHooks.useUser({ id: currentUser?._id });

  const onFinish = useCallback(async (values: any) => {
    await updateUser({
      ...values,
      _id: currentUser?._id,
      // images: fileList,
    }).then((item: any) => {
      setCurrentUser(item?.data);
      setFileList(item?.data?.images);
      localStorage.setItem('CurrentUser', JSON.stringify(item?.data))

      // setDefaultValue({
      //   ...userDetailData,
      // });
    });
  }, [updateUser, currentUser]);

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

  // useEffect(() => {
  //   if (userDetailData && !isLoadingUserDetail) {
  //     setUserDetail(userDetailData);
  //     setFileList(userDetailData?.images);
  //   }
  // }, [userDetailData, isLoadingUserDetail]);

  useEffect(() => {
    if (currentUserData && !currentUser) {
      const user = JSON.parse(currentUserData)
      setCurrentUser(user);
      setFileList(user?.images);
      // setUserDetail(JSON.parse(currentUserData))
    }
  }, [currentUser, currentUserData]);


  return (
    <div className='adminInformation'>
      <Helmet title={intl.formatMessage({ id: 'page.name.setting.information' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.setting.information' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => (window.history.back())}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        {currentUser && <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={values =>
            onFinish({
              ...values,
              images: fileList,
            })
          }
          initialValues={currentUser}
          scrollToFirstError
        >

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
      </Card>
    </div>
  );
};

export default Information;
