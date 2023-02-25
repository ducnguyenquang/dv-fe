import { Button, Form, Input, Select, Upload, Card } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { projectsSelectors } from '../../../../redux/selectors';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { projectsHooks } from 'app/containers/Admin/Project';
import { Project } from 'models/project';
import Editor from 'app/components/Editor/CkEditor';

import './ProjectDetailForm.less';
import { useNavigate } from 'react-router-dom';

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
}

const ProjectDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  // const [text, setText] = useState('');

  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  // const [search, setSearch] = useState({
  //   type: initialValues?.type,
  // });

  // const [projects, setProjects] = useState<Project[]>([]);

  // const { data: projectsData, isLoading: isLoadingProjectsData } = projectsHooks.useProjects({
  //   pagination: {
  //     limit: 1000,
  //     offset: 0,
  //   },
  // });

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.images : []);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // useEffect(() => {
  //   if (projectsData && !isLoadingProjectsData) {
  //     setProjects(projectsData.data);
  //   }
  // }, [projectsData, isLoadingProjectsData]);

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

  // const onSelectedType = (value: string) => {
  //   console.log('==== onSelectedType value', value);
  //   const searchData = {
  //     type: value,
  //   };
  //   setSearch(searchData);
  // };

  return (
    <div className="projectDetailForm">
      <Helmet title={intl.formatMessage({ id: 'page.name.projectDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.projectDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/projects`, { replace: true })}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async (values) => {
            await onFinish({
              ...values,
              description: encodeURIComponent(values.description),
              slug: encodeURIComponent(values.slug),
              images: fileList,
            })
            .then(() => {
              navigate(`/admin/projects`, { replace: true });
            });
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'project.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'project.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'project.sku' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'project.sku' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item name="summary" label={intl.formatMessage({ id: 'project.summary' })}>
            <Input.TextArea showCount maxLength={100} value={initialValues?.summary} />
          </Form.Item>

          <Form.Item name="description" label={intl.formatMessage({ id: 'project.description' })}>
            <Editor value={description} onChange={setDescription} />
          </Form.Item>

          <Form.Item label={intl.formatMessage({ id: 'project.images' })}>
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <ImgCrop rotate>
                <Upload {...props} listType="picture-card" onChange={onChange} onPreview={onPreview}>
                  {fileList?.length < 1 && `+ ${intl.formatMessage({ id: 'project.button.addImages' })}`}
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

export default ProjectDetailForm;
