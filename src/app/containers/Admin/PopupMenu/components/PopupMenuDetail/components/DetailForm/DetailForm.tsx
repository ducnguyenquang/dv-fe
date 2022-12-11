import { Button, Form, Input, Card, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
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

const DetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const [text, setText] = useState('');
  const [form] = Form.useForm();
  const [body, setBody] = useState('');

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

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })}
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
          onFinish={values => {
            onFinish({
              ...values,
              images: fileList,
            });
            window.location.href = '/admin/popupMenu';
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.popupMenu.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.popupMenu.name' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={intl.formatMessage({ id: 'common.image' })}>
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <ImgCrop rotate>
                <Upload {...props} listType="picture-card" onChange={onChange} onPreview={onPreview}>
                  {fileList?.length < 1 && `+ ${intl.formatMessage({ id: 'product.button.addImages' })}`}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form.Item>
          <Form.Item name="url" label={intl.formatMessage({ id: 'setting.popupMenu.url' })}>
            <Input />
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

export default DetailForm;
