import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
// import { productsSelectors } from '../../../../redux/selectors';
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
}

const CategoryDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="update"
      onFinish={(values) => onFinish({
        ...values,
        // images: fileList,
      })}
      initialValues={initialValues}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Category Name"
        rules={[
          {
            required: true,
            message: 'Please input Category Name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Category Slug"
        rules={[
          {
            required: true,
            message: 'Please input Category Slug',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please input Intro',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} value={initialValues?.description} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {isUpdate ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryDetailForm;
