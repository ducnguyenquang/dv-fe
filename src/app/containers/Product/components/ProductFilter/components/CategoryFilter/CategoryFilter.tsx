import { Checkbox } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Brand } from 'models/brand';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [checkedList, setCheckedList] = useState<CheckboxValueType[] | undefined>(
    filters?.categories?.map(item => JSON.stringify(item))
  );
  const [search, setSearch] = useState<any>();
  const { data: categories, isSuccess } = productsHooks.useCategories({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const plainOptions = useMemo(() => {
    return categories
      ? categories?.data?.map((item: Brand) => {
          // return { label: item.name, value: item.slug, key: item._id } as CheckboxOptionType;
          return { label: item.name, value: JSON.stringify(item), key: item._id } as CheckboxOptionType;
        })
      : undefined;
  }, [categories]);

  // useEffect(() => {
  //   if (data && !isLoading) {
  //     setCategories(data?.data);
  //   }
  // }, [data, isLoading]);

  useEffect(() => {
    setCheckedList(filters?.categories?.map(item => JSON.stringify(item)));
    if (filters?.types) {
      const type = filters?.types?.map((item: any) => item._id).join('|');
      setSearch({
        type,
      });
    }
  }, [filters?.categories, filters?.types]);

  const onChange = useCallback((checkedValues: any) => {
    setCheckedList(checkedValues);
    onCategorySelected(checkedValues);
  }, [onCategorySelected]);

  return (
    <div className="categoryFilter">
      {isSuccess && <Checkbox.Group options={plainOptions} onChange={onChange} value={checkedList} />}
    </div>
  );
};

export default CategoryFilter;
