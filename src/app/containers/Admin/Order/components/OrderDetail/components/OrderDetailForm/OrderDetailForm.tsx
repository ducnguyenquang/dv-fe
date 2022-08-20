import {
  // Button,
  Form,
  // Input,
  Select,
  // Upload,
  Badge,
  Descriptions,
  Card,
  Button,
} from 'antd';
import { OrderItem } from 'models/order';
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

const OrderDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.orderDetail' })} />
      <Card
        title={`${intl.formatMessage({ id: 'page.name.orderDetail' })} [${initialValues.orderNumber}]`}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => window.history.back()}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Descriptions
          // title={`${intl.formatMessage({ id: 'order.detail.title' })} [${initialValues.orderNumber}]`}
          bordered
        >
          <Descriptions.Item label={intl.formatMessage({ id: 'order.email' })}>{initialValues.email}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.total' })}>{initialValues.total}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.createdBy' })}>
            {initialValues.createdBy}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.status' })} span={3}>
            <Badge status="processing" text={initialValues.status} />
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.products' })}>
            {initialValues.orderItems.map((item: OrderItem) => {
              return (
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={item?.product?.images?.[0]?.thumbUrl} />}
                >
                  <Card.Meta title={item?.product?.name} description={`${item?.quantity} - ${item?.total}`} />
                </Card>
              );
            })}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default OrderDetailForm;
