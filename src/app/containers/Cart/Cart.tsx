import { Space, Popconfirm, Button, Form, Input, InputNumber, Select, notification, Empty } from 'antd';
// import { ColumnsType } from 'antd/lib/table';
// import { ServiceTable } from 'common/components/ServiceTable';
// import { PAGE, PAGE_SIZE } from 'constants/products';
import { Cart as CartModel } from 'models/cart';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
// import { Product } from '../DashBoard/components/ProductList';
// import { cartActions, cartHooks } from "../Cart";
import CartItem from './components/CartItem/CartItem';
import type { UploadFile } from 'antd/es/upload/interface';
import layout from 'antd/lib/layout';
import './Cart.less';
// import { storage } from 'utils';
import { useDispatch } from 'react-redux';
import { ordersHooks } from '../Admin/Order';
import { getCities, getWards } from 'utils/location/location';
import { statusOrder } from 'constants/order';
// import ToastMessage from '../Template/components/AdminTemplate/components/ToastMessage/ToastMessage';

// interface DataType {
//   images: UploadFile[];
//   name: string;
//   quantity: string;
//   total: string;
//   _id: string;
// }

const Cart = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { mutateAsync: createOrder, isLoading: isLoadingCreateOrder } = ordersHooks.useCreateOrder();

  const [cart, setCart] = React.useState<CartModel>();
  const [cities, setCities] = React.useState(getCities());
  const [wards, setWards] = React.useState<any[]>();

  const cartStringData = localStorage.getItem('shoppingCart');
  useEffect(() => {
    if (cartStringData) {
      const cartData: CartModel = JSON.parse(cartStringData);
      setCart(cartData);
    }
  }, [cartStringData]);

  const openNotificationWithIcon = useCallback((type: NotificationType, item: any) => {
    notification[type]({
      message: intl.formatMessage(
        { id: 'common.event.message.success' },
        { name: intl.formatMessage({ id: 'cart.notification.content.adding.success' }, { name: item.orderNumber }) }
      ),
      // onClick: () => {
      //   window.location.href = '/cart'
      // }
    });
  }, [intl]);

  const onFinish = useCallback(
    async (values: any) => {
      const order = await createOrder({
        ...cart,
        ...values,
        orderItems: cart?.orderItems?.map(item => {
          return {
            ...item,
            product: item?.product?._id,
          };
        }),
        status: statusOrder.NEW,
      });
      openNotificationWithIcon('success', order)
      localStorage.setItem('shoppingCart', '');
      window.location.href = '/';
    },
    [cart, createOrder, openNotificationWithIcon]
  );

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  
  

  const onDelete = (id: string) => {
    const indexItem = cart?.orderItems?.findIndex(item => item.product?._id === id);
    // console.log('==== onDelete cart', cart);

    // console.log('==== onDelete indexItem', indexItem);

    if (indexItem !== undefined && indexItem > -1) {
      const removedItem = cart?.orderItems?.splice(indexItem, 1);
      // console.log('==== onDelete cart 1111', cart);

      const result = {
        ...cart,
      };
      setCart(result);
      // console.log('==== onDelete result', result);

      return cart ? localStorage.setItem('shoppingCart', JSON.stringify(result)) : null;
    }
  };

  const handleCityChange = (value: string) => {
    console.log(`selected ${value}`);
    setWards([]);
    setWards(getWards(value));
  };

  return (
    <div className="cart">
      <div className="cartItems">
        <div className="title">{intl.formatMessage({ id: 'cart.cart.title' })}</div>
        {cart?.orderItems && cart?.orderItems?.length > 0 ? cart?.orderItems?.map(item => (
          <CartItem data={item} onDelete={onDelete} />
        )) : <Empty description={'Không có sản phẩm'} />}
      </div>
      <div className="customerInfo">
        <div className="title">{intl.formatMessage({ id: 'cart.customer.title' })}</div>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className=""
          title={intl.formatMessage({ id: 'cart.customer.title' })}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item
            name={['customer', 'name']}
            label={intl.formatMessage({ id: 'cart.customer.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['customer', 'phone']}
            label={intl.formatMessage({ id: 'cart.customer.phone' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.phone' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['customer', 'city']}
            label={intl.formatMessage({ id: 'cart.customer.city' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.city' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({ id: 'common.select.placeholder' })}
              // defaultValue={['a10', 'c12']}
              onChange={handleCityChange}
            >
              {cities &&
                cities?.map((city: any) => {
                  return <Select.Option key={`${city.code}`}>{city.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['customer', 'ward']}
            label={intl.formatMessage({ id: 'cart.customer.ward' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.ward' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({ id: 'common.select.placeholder' })}
              // defaultValue={['a10', 'c12']}
              // onChange={handleChange}
            >
              {wards &&
                wards?.map((ward: any) => {
                  return <Select.Option key={ward.name}>{ward.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['customer', 'address']}
            label={intl.formatMessage({ id: 'cart.customer.address' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.address' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['customer', 'email']}
            label={intl.formatMessage({ id: 'cart.customer.email' })}
            rules={[
              {
                type: 'email',
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'cart.customer.email' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item name={'note'} label={intl.formatMessage({ id: 'cart.customer.note' })}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'cart.button.book' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Cart;
