import { Button, Space, Table, Tag, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { categoriesHooks, categoriesActions, categoriesApi } from 'app/containers/Admin/Category';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Category } from 'models/category';
import { useIntl } from 'react-intl';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface DataType {
  key: string;
  name: string;
  description: string;
  slug: string;
  _id: string;
}

const CategoryTable = (): JSX.Element => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = categoriesHooks.useCategories({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteCategory, isLoading: isLoadingDeleteCategory } = categoriesHooks.useDeleteCategory();

  useEffect(() => {
    if (data && !isLoading) {
      console.log('==== data.data 111', data);
      setCategories(data.data);
    }
  }, [data, isLoading]);

  const getProductDetail = async (row: DataType) => {
    await dispatch(categoriesActions.setCategoryDetail(row));
    window.location.href = `/admin/category/${row?.slug}`;

    // dispatch(productsApi.setEquipmentPagination(pagination));
  };

  const onDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories([...categories]);
    // window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'category.categoryName' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getProductDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title="Are you sure delete this category?"
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteCategory(record._id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">
              Delete
            </a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  return <>
    <Button type="primary" htmlType="submit" onClick={() => window.location.href = '/admin/category/add'}>
      Add Category
    </Button>
    <ServiceTable
      columns={columns}
      dataSource={categories}
      total={data?.pagination?.totalCount}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      onChangePagination={(page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
      }}
      onShowSizeChange={pageSize => {
        setPageSize(pageSize);
      }}
    />
  </>;
};

export default CategoryTable;
