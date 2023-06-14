import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useEffect, useState } from 'react';
import type { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';

import './BrandFilter.less';

interface IProp {
  onBrandSelected?: any;
  defaultValue?: any;
}

const BrandFilter = ({ onBrandSelected, defaultValue }: IProp): JSX.Element => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();

  const { data, isLoading } = productsHooks.useBrands({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const plainOptions = brands
    ? brands.map(item => {
        return { label: item.name, value: JSON.stringify(item), key: item._id } as CheckboxOptionType;
      })
    : undefined;

  useEffect(() => {
    if (data && !isLoading) {
      setBrands(data?.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCheckedList(defaultValue?.map((item: any) => JSON.stringify(item)));
  }, [defaultValue]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues);
    onBrandSelected(checkedValues);
    if (checkedValues && checkedValues.length > 0) {
    }
  };

  return (!!brands && (
    <div className="brandFilter">
      <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />
    </div>
  ));
};

export default BrandFilter;
