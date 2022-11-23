
import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';

import './LedAttributeFilter.less';

interface IProp {
  onLedAttributeSelected?: any;
  defaultValue?: any;
}

const LedAttributeFilter = ({ onLedAttributeSelected, defaultValue }: IProp): JSX.Element => {
  const intl = useIntl();

  const [colors, setColor] = useState([
    {value: '27000-3000', label: intl.formatMessage({ id: 'filter.ledAttribute.2k7-3k' })},
    {value: '4000', label: intl.formatMessage({ id: 'filter.ledAttribute.4k' })},
    {value: '6000-6500', label: intl.formatMessage({ id: 'filter.ledAttribute.6k-6k5' })},
  ]);

  const plainOptions = colors
    ? colors.map(item => {
        return { label: item.label, value: JSON.stringify(item), key: `type-${item.value}` } as CheckboxOptionType;
      })
    : undefined;

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultValue);

  useEffect(() => {
    setCheckedList(defaultValue?.map((item: any) => JSON.stringify(item)))
  }, [defaultValue]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setCheckedList(checkedValues);
    if(checkedValues && checkedValues.length > 0) {
      onLedAttributeSelected(checkedValues as string[])
    }
  };

  return (
    <div className="ledAttributeFilter">
      {/* <h1>{intl.formatMessage({ id: 'template.leftMenu.TypeFilter.title' })}</h1> */}
      {colors && <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />}
    </div>
  );
};

export default LedAttributeFilter;