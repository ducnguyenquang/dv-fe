import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';

import './BrandFilter.less';

interface IProp {
  onBrandSelected?: any;
  defaultValue?: any;
}

const BrandFilter = ({ onBrandSelected, defaultValue }: IProp): JSX.Element => {
  const intl = useIntl();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultValue);

  const { data, isLoading } = productsHooks.useBrands({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const plainOptions = brands
    ? brands.map(item => {
        return { label: item.name, value: item.slug, key: item._id } as CheckboxOptionType;
      })
    : undefined;

  useEffect(() => {
    if (data && !isLoading) {
      setBrands(data?.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCheckedList(defaultValue)
  }, [defaultValue]);

  // console.log('==== BrandFilter checkedList', checkedList)

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setCheckedList(checkedValues);
    if(checkedValues && checkedValues.length > 0) {
      onBrandSelected(checkedValues as string[])
    }
  };

  return (
    <div className="brandFilter">
      {/* <h1>{intl.formatMessage({ id: 'template.leftMenu.brandFilter.title' })}</h1> */}
      {brands && <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />}
    </div>
  );
};

export default BrandFilter;

