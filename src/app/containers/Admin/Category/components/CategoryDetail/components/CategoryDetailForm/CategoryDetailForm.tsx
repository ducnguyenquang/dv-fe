import { Button, Card, Form, Input, Select } from 'antd';
import { categoriesHooks } from 'app/containers/Admin/Category';
import { TYPE_OPTIONS } from 'constants/type';
import { Category } from 'models/category';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  const [form] = Form.useForm();
  const [search, setSearch] = useState({});
  const [categories, setCategories] = useState<Category[]>([]);

  const [types] = useState(TYPE_OPTIONS);
  const { data: categoriesData, isLoading: isLoadingCategories } = categoriesHooks.useCategories({
    search: search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const onSelectedType = (value: string) => {
    const searchData = {
      type: value,
    }
    setSearch(searchData)
  }
    console.log('==== search', search)

  useEffect(() => {
    // console.log('==== useEffect data', data)
    // console.log('==== useEffect isLoading', isLoading)

    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData?.data);
    }
  }, [isLoading, categoriesData, isLoadingCategories]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.categoryDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.categoryDetail' })}
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
            onFinish({
              ...values,
              // images: fileList,
            })
          }
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'category.categoryName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'category.categoryName' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'category.slug' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'category.slug' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label={intl.formatMessage({ id: 'category.type' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'category.type' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select allowClear placeholder={intl.formatMessage({ id: 'category.type.placeholder' })} onChange={value => onSelectedType(value)}>
              {types &&
                types?.map(item => (
                  <Select.Option key={item?.value} value={item?.value}>
                    {item?.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="parentId"
            label={intl.formatMessage({ id: 'category.parentCategory' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'category.type' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select allowClear placeholder={intl.formatMessage({ id: 'category.parentCategory.placeholder' })}>
              {categories &&
                categories?.map(item => (
                  <Select.Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={intl.formatMessage({ id: 'category.description' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'category.description' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input.TextArea showCount maxLength={100} value={initialValues?.description} />
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

export default CategoryDetailForm;
