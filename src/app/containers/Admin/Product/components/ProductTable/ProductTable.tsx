import { Button, Space, Table, Tag, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { productsHooks, productsActions, productsApi } from 'app/containers/Admin/Product';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface DataType {
  key: string;
  name: string;
  description: string;
  brand: string;
  sku: string;
  slug: string;
  categories: Category[];
  _id: string;
}

const ProductTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = productsHooks.useProducts({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteProduct, isLoading: isLoadingDeleteProduct } = productsHooks.useDeleteProduct();

  useEffect(() => {
    if (data && !isLoading) {
      console.log('==== data.data 111', data);
      setProducts(data.data);
    }
  }, [data, isLoading]);

  const getProductDetail = async (row: DataType) => {
    await dispatch(productsActions.setProductDetail(row));
    window.location.href = `/admin/product/${row?.slug}`;

    // dispatch(productsApi.setEquipmentPagination(pagination));
  };

  const onDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts([...products]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
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
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Sku',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title="Are you sure delete this product?"
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteProduct(record._id)}
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
    <Button type="primary" htmlType="submit" onClick={() => window.location.href = '/admin/product/add'}>
      Add Product
    </Button>
    <ServiceTable
      columns={columns}
      dataSource={products}
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

export default ProductTable;
