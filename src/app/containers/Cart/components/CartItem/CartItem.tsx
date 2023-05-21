import { Avatar, Button, Card, Input, Tag, Checkbox, Popconfirm, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { COLOR_TEMPERATURE_OPTIONS } from 'constants/common';
import { OrderItem } from 'models/order';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/string';
import { DeleteOutlined } from '@ant-design/icons';

import './CartItem.less';
const { Meta } = Card;

interface IProps {
  data?: OrderItem;
  onDelete?: (productId: string) => void;
  onItemsChecked?: (isChecked:boolean, item: any) => void;
  onQuantityChange?: (quantity: number, sku: string) => void;
}

const CartItem = ({ data, onDelete, onItemsChecked, onQuantityChange }: IProps): JSX.Element => {
  const intl = useIntl();
  const [quantity, setQuantity] = useState<number>(data?.quantity || 1);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    onItemsChecked?.(e.target.checked, data)
  };

  const onInputQuantityChange = (item: any) => {
    const quantity = item.target.value as number;
    setQuantity(quantity);
    onQuantityChange?.(quantity, data?.sku as string);
  };

  return (
    <Card style={{ marginTop: 16 }} className="cartItem">
      <Meta
        className="productInfo"
        avatar={
          <div className="avatarBlock">
            <Checkbox onChange={onChange} />
            <Avatar
              src={data?.product?.images?.[0]?.url || data?.product?.images?.[0]?.thumbUrl || '/images/no-image.png'}
              shape='square'
            />
          </div>
        }
        title={<Link to={`/product/${data?.product?.slug}`}>{data?.product?.name}</Link>}
        description={
          <>
            <div className="specsBlock">
              <div className="sku">
                {intl.formatMessage({ id: 'product.sku' })}:<Tag>{data?.product?.slug}</Tag>
              </div>
              <div className="power">
                {intl.formatMessage({ id: 'product.power' })}:<span>{data?.power}</span>
              </div>
              <div className="color">
                {intl.formatMessage({ id: 'product.color' })}:<span style={{ backgroundColor: data?.color }} />
              </div>
              <div className="colorTemperature">
                {intl.formatMessage({ id: 'product.color_temperature' })}:
                <span>{COLOR_TEMPERATURE_OPTIONS.filter(c => c.value === data?.colorTemperature)?.[0]?.label}</span>
              </div>
            </div>
          </>
        }
      />
      <div className="priceBlock">
        <div className="pricing">
          {data?.price ? numberWithCommas(data?.price + '') : intl.formatMessage({ id: 'common.price.contactPlease' })}
        </div>
        <div className="quantity">
          <Input
            className="quantity-input"
            min={1}
            type="number"
            defaultValue={quantity}
            onChange={onInputQuantityChange}
          />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: data?.product?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDelete?.(data?.product?._id as string)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
