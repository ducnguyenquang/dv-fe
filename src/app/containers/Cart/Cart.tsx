import { Space, Popconfirm, Button, Form, Input, InputNumber, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Cart as CartModel } from 'models/cart';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Product } from '../DashBoard/components/Product';
// import { cartActions, cartHooks } from "../Cart";
import CartItem from './components/CartItem/CartItem';
import type { UploadFile } from 'antd/es/upload/interface';
import layout from 'antd/lib/layout';
import './Cart.less';
import { storage } from 'utils';
import { useDispatch } from 'react-redux';
import { ordersHooks } from '../Admin/Order';
import { getCities, getWards } from 'utils/location/location';

interface DataType {
  images: UploadFile[];
  name: string;
  quantity: string;
  total: string;
  _id: string;
}

const Cart = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { mutateAsync: createOrder, isLoading: isLoadingCreateOrder } = ordersHooks.useCreateOrder();

  // const temp: OrderItem[] = [
  //   {
  //     product: {
  //       id: '1',
  //       name: 'abc',
  //       pricing: 0,
  //     },
  //     quantity: '1',
  //     // total: '1000',
  //   },
  //   {
  //     product: {
  //       id: '2',
  //       name: 'def',
  //       pricing: 0,
  //     },
  //     quantity: '2',
  //     // total: '2000',
  //   }
  // ];

  const [cart, setCart] = React.useState<CartModel>();
  const [cities, setCities] = React.useState(getCities());
  const [wards, setWards] = React.useState<any[]>();

  // const [page, setPage] = React.useState(PAGE);
  // const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  // const { data, isLoading } = productsHooks.useProducts({
  //   pagination: {
  //     limit: pageSize,
  //     offset: page * pageSize,
  //   },
  // });

  // const cartStringData = storage.getShoppingCart();
  const cartStringData = localStorage.getItem('shoppingCart');
  // console.log('==== cartStringData', cartStringData);
  useEffect(() => {
    if (cartStringData) {
      const cartData: CartModel = JSON.parse(cartStringData);
      setCart(cartData);
    }
  }, [cartStringData]);

  const onFinish = useCallback(
    async (values: any) => {
      // console.log('===== onFinish values', values);
      // console.log('===== onFinish cart', cart);
      // return;
      await createOrder({
        ...cart,
        ...values,
        orderItems: cart?.orderItems?.map(item => {
          return {
            ...item,
            product: item?.product?._id,
          };
        }),
      }).then((item: any) => {
        console.log('==== item', item);
      });
    },
    [cart, createOrder]
  );

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
  // console.log('==== cart', cart);

  // const children: React.ReactNode[] = [];
  // const cities = getCities()
  // cities.map(city => children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>))
  // for (let i = 10; i < 36; i++) {
  //   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  // }
  // console.log('==== cities', cities);

  const handleCityChange = (value: string) => {
    console.log(`selected ${value}`);
    setWards([]);
    // const code = value.split('-');
    setWards(getWards(value));
  };

  return (
    <div className="cart">
      <div className="cartItems">
        <div className="title">{intl.formatMessage({ id: 'cart.cart.title' })}</div>
        {cart?.orderItems?.map(item => (
          <CartItem data={item} onDelete={onDelete} />
        ))}
      </div>
      <div className="customerInfo">
        <div className="title">{intl.formatMessage({ id: 'cart.customer.title' })}</div>

        <Form
          className=""
          title={intl.formatMessage({ id: 'cart.customer.title' })}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item
            name={['customer', 'name']}
            label={intl.formatMessage({ id: 'cart.customer.name' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['customer', 'phone']} label={intl.formatMessage({ id: 'cart.customer.phone' })}>
            <Input />
          </Form.Item>
          <Form.Item name={['customer', 'city']} label={intl.formatMessage({ id: 'cart.customer.city' })}>
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              onChange={handleCityChange}
            >
              {cities &&
                cities?.map((city: any) => {
                  return <Select.Option key={`${city.code}`}>{city.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item name={['customer', 'ward']} label={intl.formatMessage({ id: 'cart.customer.ward' })}>
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              // onChange={handleChange}
            >
              {wards &&
                wards?.map((ward: any) => {
                  return <Select.Option key={ward.name}>{ward.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item name={['customer', 'address']} label={intl.formatMessage({ id: 'cart.customer.address' })}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['customer', 'email']}
            label={intl.formatMessage({ id: 'cart.customer.email' })}
            rules={[{ type: 'email' }]}
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
