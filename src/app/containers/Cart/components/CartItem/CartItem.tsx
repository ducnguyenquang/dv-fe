import { Avatar, Button, Card, InputNumber } from 'antd';
import { OrderItem } from 'models/order';
import { useState } from 'react';
import { useIntl } from 'react-intl';
// import React, { useState } from 'react';
import './CartItem.less';
const { Meta } = Card;

interface IProps {
  data?: OrderItem;
  onDelete?: (productId: string) => void;
}

const CartItem = ({ data, onDelete}: IProps): JSX.Element => {
  const intl = useIntl();
  const [quantity, setQuantity] = useState(data?.quantity);


  return <>
    <Card style={{ marginTop: 16 }} className="cartItem">
      <Meta className='productInfo'
        avatar={<Avatar src={data?.product?.images?.[0]?.url || data?.product?.images?.[0]?.thumbUrl || '/images/no-image.png'} />}
        title={data?.product?.name}
        description={
          <>
            <InputNumber className='quantity' value={quantity} onChange={setQuantity}/>
            <Button type='ghost' onClick={() => onDelete?.(data?.product?._id as string)}>{intl.formatMessage({ id: 'common.button.delete' })}</Button>
          </>
        }
      />
      <div className='inputBlock'>
        Liên hệ
      </div>
    </Card>
  </>
}

export default CartItem;