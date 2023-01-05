import { Rate, Button, Tooltip, notification } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from 'models/product';
import { useIntl } from 'react-intl';
import './ListItemComponent.less';
import { Cart } from 'models/cart';
interface IProps {
  data: Product;
}

const ListItemComponent = ({ data }: IProps): JSX.Element => {
  const intl = useIntl();

  // const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  //   <Space>
  //     {React.createElement(icon)}
  //     {text}
  //   </Space>
  // );

  // console.log('==== ProductListItem data', data);

  const goToProductDetail = () => {
    window.location.href = data?.slug ? `/product/${encodeURIComponent(data?.slug)}` : '';
  };

  const onAddCart = async (cartItem: any) => {
    const cartStringData = localStorage.getItem('shoppingCart');
    console.log('==== onAddCart item',cartItem)
    let cartData: Cart = {
      total: 0,
      orderItems: [{
        product: cartItem,
        total: 0,
        quantity: 1,
      }],
      // customer: value,
    }

    // if (cartStringData) {
      cartData = cartStringData ? JSON.parse(cartStringData) : cartData;
      const orderItem = cartData?.orderItems?.find(item => item.product?._id === cartItem._id);

      if (orderItem) {
        orderItem.total = 0
        orderItem.quantity += 1
      } else {
        cartData?.orderItems?.push({
          product: cartItem,
          total: 0,
          quantity: 1,
        })
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cartData));
      openNotificationWithIcon('success', cartItem)
    // }

  }

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  
  const openNotificationWithIcon = (type: NotificationType, item: any) => {
    notification[type]({
      message: intl.formatMessage(
        { id: 'common.event.message.success' },
        { name: intl.formatMessage({ id: 'cart.notification.content.adding.success' }, { name: item.name }) }
      ),
      onClick: () => {
        window.location.href = '/cart'
      }
    });
  };

  return (
    <div className="listItem" onClick={goToProductDetail}>
      <div className="image">
        <img
          width={272}
          alt="logo"
          src={data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
          onError={error => {
            error.currentTarget.src = '/images/no-image.png';
            error.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className="content">
        <div className="leftSide">
          <div className="information">
            <div className="title">{data?.name}</div>
            <div className="description">{data?.summary}</div>
            <div className="rate">
              <Rate disabled defaultValue={4} />
            </div>
          </div>
          <div className="extraData">
            <div className="brand">
              {data?.brand && `${intl.formatMessage({ id: 'product.brand' })}:  ${data?.brand?.name}`}
            </div>
            <div className="category">
              {data?.categories &&
                `${intl.formatMessage({ id: 'product.categories' })}:  ${data?.categories
                  ?.map(item => item.name)
                  .join(', ')}`}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
          <div className="action">
            <Tooltip title={intl.formatMessage({ id: 'common.button.favourite' })}>
              <Button type="link" shape="circle" icon={<HeartOutlined />} size="large" />
            </Tooltip>
            <Button type="primary" icon={<ShoppingCartOutlined />} onClick={(e) => {e.stopPropagation();onAddCart(data)}} >
              {intl.formatMessage({ id: 'product.button.cart' })}
            </Button>
            {/* <Button
              className="detailButton"
              type="primary"
              onClick={() => (window.location.href = `/product/${encodeURIComponent(data?.slug as string)}`)}
            >
              {intl.formatMessage({ id: 'common.button.detail' })}
            </Button> */}
            {/* <Button className="favouriteButton" type="ghost">
              {intl.formatMessage({ id: 'common.button.favourite' })}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemComponent;