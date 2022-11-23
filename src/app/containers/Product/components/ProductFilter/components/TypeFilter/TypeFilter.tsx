import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';

import './TypeFilter.less';

interface IProp {
  onTypeSelected?: any;
  defaultValue?: any;
}

const TypeFilter = ({ onTypeSelected, defaultValue }: IProp): JSX.Element => {
  const intl = useIntl();

  const [types, setTypes] = useState([
    { _id: 'cap-dien', value: 'cap-dien', label: 'Cáp điện' },
    { _id: 'den-led', value: 'den-led', label: 'Đèn led' },
  ]);

  const plainOptions = types
    ? types.map(item => {
        // return { label: item.label, value: item._id, key: `type-${item._id}` } as CheckboxOptionType;
        return { label: item.label, value: JSON.stringify(item), key: `type-${item._id}` } as CheckboxOptionType;
      })
    : undefined;

  useEffect(() => {
    setCheckedList(defaultValue?.map((item: any) => JSON.stringify(item)));
  }, [defaultValue]);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultValue);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    // const checkedData = checkedValues.map((item: any) => item._id) as string[]

    setCheckedList(checkedValues);
    onTypeSelected(checkedValues);
  };

  return (
    <div className="typeFilter">
      {/* <h1>{intl.formatMessage({ id: 'template.leftMenu.TypeFilter.title' })}</h1> */}
      {types && <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />}
    </div>
  );
};

export default TypeFilter;
