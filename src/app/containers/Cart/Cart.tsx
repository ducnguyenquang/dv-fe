import { Button, Form, Input, Select, notification, Empty } from 'antd';
import { Cart as CartModel } from 'models/cart';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import CartItem from './components/CartItem/CartItem';
import layout from 'antd/lib/layout';
import './Cart.less';
import { ordersHooks } from '../Admin/Order';
import { getCities, getWards } from 'utils/location/location';
import { statusOrder } from 'constants/order';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from 'utils/string';

const Cart = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isLoading: isLoadingCreateOrder } = ordersHooks.useCreateOrder();

  const [cart, setCart] = useState<CartModel>();
  const [cities, setCities] = useState(getCities());
  const [wards, setWards] = useState<any[]>();
  const [productsChecked, setProductsChecked] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const cartStringData = localStorage.getItem('shoppingCart');

  useEffect(() => {
    if (cartStringData) {
      const cartData: CartModel = JSON.parse(cartStringData);
      setCart(cartData);
    }
  }, [cartStringData]);

  const openNotificationWithIcon = useCallback(
    (type: NotificationType, item: any) => {
      notification[type]({
        message: intl.formatMessage(
          { id: 'common.event.message.success' },
          { name: intl.formatMessage({ id: 'cart.notification.content.adding.success' }, { name: item.orderNumber }) }
        ),
      });
    },
    [intl]
  );

  const onFinish = useCallback(
    async (values: any) => {
      const order = await createOrder({
        ...cart,
        ...values,
        orderItems: productsChecked?.map(item => {
          return {
            ...item,
            product: item?.product?._id,
          };
        }),
        status: statusOrder.NEW,
      });
      openNotificationWithIcon('success', order);
      localStorage.setItem('shoppingCart', '');
      navigate(`/`);
    },
    [cart, createOrder, navigate, openNotificationWithIcon, productsChecked]
  );

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const onDelete = useCallback(
    async (id: string) => {
      const indexItem = cart?.orderItems?.findIndex(item => item.product?._id === id);
      if (indexItem !== undefined && indexItem > -1) {
        const removedItem = cart?.orderItems?.splice(indexItem, 1);
        const result = {
          ...cart,
        };
        setCart(result);
        return cart ? localStorage.setItem('shoppingCart', JSON.stringify(result)) : null;
      }
    },
    [cart]
  );

  const handleCityChange = (value: string) => {
    console.log(`selected ${value}`);
    setWards([]);
    setWards(getWards(value));
  };

  const onProductsChecked = (isChecked: boolean, item: any) => {
    console.log('==== productsChecked', productsChecked);
    console.log('==== item', item);
    if (isChecked) {
      if (!productsChecked.includes(item)) {
        productsChecked.push(item);
      }
    } else {
      const index = productsChecked.indexOf(item);
      if (index !== -1) {
        productsChecked.splice(index, 1);
      }
    }
    setProductsChecked(() => productsChecked);
    getTotalPrice();
  };

  const onQuantityChange =
    // useCallback(
    (quantity: number, productSku: string) => {
      // const products = productsChecked;
      const product = cart?.orderItems?.find(item => item.sku === productSku);

      // const product = productsChecked.find(item => item.sku === productSku);
      if (product) {
        product.quantity = quantity;
        const productsCart = cart?.orderItems || [];
        // let index = productsCart.findIndex(item => item.sku === productSku) || -1;
        // if (index !== -1) {
        //   productsCart?.splice(index, 1);
        // }

        setCart(() => ({ ...cart, orderItems: productsCart }));

        if (productsChecked) {
          const index = productsChecked.findIndex(item => item.sku === productSku);
          if (index !== -1) {
            const product = productsChecked.find(item => item.sku === productSku);

            product.quantity = quantity;
            // productsChecked.splice(index, 1);
            setProductsChecked([...productsChecked]);
            getTotalPrice();
          }
          
        }
      }
    };

  const getTotalPrice = () => {
    console.log('==== productsChecked', productsChecked);

    setTotalPrice( productsChecked.reduce((sum, product) => {
      console.log('==== sum', sum);
      console.log('==== product', product);
      return sum + parseInt(product.price) * parseInt(product.quantity);
    }, 0));
  };

  // useEffect(() => {
  //   if (productsChecked) {
  //     setTotalPrice(getTotalPrice(productsChecked));
  //   }
  // }, [getTotalPrice, productsChecked]);

  // console.log('==== totalPrice', totalPrice);
  console.log('==== productsChecked', productsChecked);

  return (
    <div className="cart">
      <div className="title">{intl.formatMessage({ id: 'cart.title' })}</div>

      <div className="cartItems">
        <div className="title">{intl.formatMessage({ id: 'cart.cart.title' })}</div>
        {cart?.orderItems && cart?.orderItems?.length > 0 ? (
          cart?.orderItems?.map(item => (
            <CartItem
              key={item.product?.slug}
              data={item}
              onDelete={onDelete}
              onItemsChecked={onProductsChecked}
              onQuantityChange={onQuantityChange}
            />
          ))
        ) : (
          <Empty description={intl.formatMessage({ id: 'common.empty.data' })} />
        )}
        <div className="total">
          <div className="pricing">
            <div className="pricingTitle">{intl.formatMessage({ id: 'cart.summary.pricing.title' })}:</div>
            <div className="pricing">{numberWithCommas(totalPrice + '')}</div>
            {/* {data?.price ? numberWithCommas(data?.price + '') : intl.formatMessage({ id: 'common.price.contactPlease' })} */}
          </div>
        </div>
      </div>
      <div className="customerInfo">
        <div className="title">{intl.formatMessage({ id: 'cart.customer.title' })}</div>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
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
          <Button type="primary" htmlType="submit" icon={<ShoppingCartOutlined />} className="submitButton">
            {intl.formatMessage({ id: 'cart.button.book' })}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Cart;
