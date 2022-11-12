import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';

import './CategoryFilter.less';
import { ProductFilters } from 'models/product';

interface IProp {
  onCategorySelected?: any;
  filters?: ProductFilters;
}

const CategoryFilter = ({ onCategorySelected, filters }: IProp): JSX.Element => {
  const intl = useIntl();
  // const categoryData = filters?.categories?.map(item => item._id) as string[]
  const [categories, setCategories] = useState<Brand[]>();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[] | undefined>(filters?.categories);
  const [search, setSearch] = useState<any>();
  console.log('==== checkedList', checkedList)

  console.log('==== CategoryFilter search', search)
  const { data, isLoading } = productsHooks.useCategories({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const plainOptions = categories
    ? categories.map(item => {
        return { label: item.name, value: item.slug, key: item._id } as CheckboxOptionType;
      })
    : undefined;

  useEffect(() => {
    if (data && !isLoading) {
      setCategories(data?.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (filters) {
      setCheckedList(filters?.categories);
      if (filters?.types) {
        const type = (filters?.types?.map((item: any) => item._id)).join('|');
        setSearch({
          type,
        })
      }
    }
  }, [filters]);

  // console.log('==== BrandFilter checkedList', checkedList)

  const onChange = (checkedValues: any) => {
    console.log('==== checked = ', checkedValues);
    // const checkedData = checkedValues.map((item: any) => (JSON.parse(item))._id) as string[]
    // const checkedData = JSON.parse(checkedValues)
    // console.log('==== checkedData', checkedData);
    // const checkedData = checkedValues.map((item: any) => item._id) as string[]

    setCheckedList(checkedValues);
    // if(checkedValues && checkedValues.length > 0) {
      onCategorySelected(checkedValues)
    // }
  };

  return (
    <div className="categoryFilter">
      {/* <h1>{intl.formatMessage({ id: 'template.leftMenu.categoryFilter.title' })}</h1> */}
      {categories && <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />}
    </div>
  );
};

export default CategoryFilter;
