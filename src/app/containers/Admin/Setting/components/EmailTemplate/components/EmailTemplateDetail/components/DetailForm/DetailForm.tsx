import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Card,
} from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { settingsSelectors } from 'app/containers/Admin/Setting';
// import { EmailTemplatesSelectors } from '../../../../redux/selectors';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
// import { Parser as HtmlToReactParser } from "html-to-react";
import 'react-quill/dist/quill.snow.css';
// import { EmailTemplatesActions } from 'app/containers/Admin';

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
  // categories?: Category[];
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

const DetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  // const editor = useRef();
  const [text, setText] = useState("");
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
  
  const EmailTemplateDetailParam = useSelector(settingsSelectors.getEmailTemplate);
  const intl = useIntl();

  // console.log('==== initialValues', initialValues);
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

  // useEffect(() => {
  //   const editon = editor.current.getEditor();
  //   //console.log(editon.getModule("toolbar"));
  //   let tableModule = editon.getModule("better-table");
  //   tableModule.insertTable(3, 3);
  //   console.log(tableModule);
  // }, []);
  // console.log('==== initialValues', initialValues);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.EmailTemplateDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.EmailTemplateDetail' })}
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
          onFinish={(values) => onFinish({
            ...values,
            description: encodeURIComponent(values.description),
            specification: encodeURIComponent(values.specification),
            slug: encodeURIComponent(values.slug),
            images: fileList,
          })}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'EmailTemplate.EmailTemplateName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'EmailTemplate.EmailTemplateName' })}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label={intl.formatMessage({ id: 'EmailTemplate.subject' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'EmailTemplate.subject' })}),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label={intl.formatMessage({ id: 'EmailTemplate.body' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'EmailTemplate.body' })}),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isUpdate ? intl.formatMessage({ id: 'common.button.update' }) : intl.formatMessage({ id: 'common.button.add' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default DetailForm;
