import { Form, Descriptions, Card, Button, Select } from 'antd';
import { OrderItem } from 'models/order';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import './OrderDetailForm.less';
import { statusOrder } from 'constants/order';
import { useCallback } from 'react';
import { ordersHooks } from 'app/containers/Admin/Order/hooks';
import { useNavigate } from 'react-router-dom';
interface IProps {
  isUpdate?: boolean;
  onFinish?: any;
  initialValues?: any;
  isLoading?: boolean;
}

const OrderDetailForm = ({ initialValues }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const intl = useIntl();
  const { mutateAsync: updateOrder } = ordersHooks.useUpdateOrder();

  const statusOptions: any[] = [
    { label: intl.formatMessage({ id: 'order.status.new' }), value: statusOrder.NEW },
    { label: intl.formatMessage({ id: 'order.status.inprogress' }), value: statusOrder.INPROGRESS },
    { label: intl.formatMessage({ id: 'order.status.done' }), value: statusOrder.DONE },
  ];

  const changeStatus = useCallback(
    async (status: string) => {
      await updateOrder({
        ...initialValues,
        status,
      }).then(() => navigate(`/admin/orders`, { replace: true }));
    },
    [initialValues, navigate, updateOrder]
  );

  return (
    <div className="orderDetail">
      <Helmet title={intl.formatMessage({ id: 'page.name.orderDetail' })} />
      <Card
        title={`${intl.formatMessage({ id: 'page.name.orderDetail' })} [${initialValues?.orderNumber}]`}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/orders`, { replace: true })}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Descriptions
          // title={`${intl.formatMessage({ id: 'order.detail.title' })} [${initialValues.orderNumber}]`}
          bordered
        >
          <Descriptions.Item label={intl.formatMessage({ id: 'order.email' })}>
            {initialValues?.customer.email}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.phone' })}>
            {initialValues?.customer.phone}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.customer' })}>
            {initialValues?.customer.name}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.status' })} span={3}>
            {/* <Badge status="processing" text={initialValues.status} /> */}
            <Select
              placeholder={intl.formatMessage({ id: 'order.status.placeholder' })}
              defaultValue={initialValues?.status}
              onChange={changeStatus}
            >
              {statusOptions?.map(item => (
                // eslint-disable-next-line react/jsx-no-undef
                <Select.Option key={item?.value} value={item?.value}>
                  {item?.label}
                </Select.Option>
              ))}
            </Select>
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'order.products' })}>
            <div className="orderItems">
              {initialValues?.orderItems.map((item: OrderItem) => {
                return (
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={item?.product?.images?.[0]?.url || item?.product?.images?.[0]?.thumbUrl || '/images/no-image.png'} />}
                  >
                    <Card.Meta title={item?.product?.name} description={`Số lương: ${item?.quantity}`} />
                  </Card>
                );
              })}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default OrderDetailForm;
