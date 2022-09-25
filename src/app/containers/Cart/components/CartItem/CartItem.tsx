import { Avatar, Button, Card } from 'antd';
import { OrderItem } from 'models/order';
import { useIntl } from 'react-intl';
// import React, { useState } from 'react';

const { Meta } = Card;

interface IProps {
  data?: OrderItem;
  onDelete?: (productId: string) => void;
}

const CartItem = ({ data, onDelete}: IProps): JSX.Element => {
  const intl = useIntl();

  return <>
    <Card style={{ marginTop: 16 }} >
      <Meta
        avatar={<Avatar src={data?.product?.images?.[0]?.thumbUrl} />}
        title={data?.product?.name}
        description={<Button type='ghost' onClick={() => onDelete?.(data?.product?.id as string)}>{intl.formatMessage({ id: 'common.button.delete' })}</Button>}
      />
    </Card>
  </>
}

export default CartItem;