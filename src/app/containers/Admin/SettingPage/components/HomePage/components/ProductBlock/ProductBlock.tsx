import { Card, Space, Button, Form, UploadFile, Input, AutoComplete, Select } from 'antd';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage/hooks';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './ProductBlock.less';
import { settingsHooks } from 'app/containers/Admin/Setting/hooks';
import { productsHooks } from 'app/containers/Admin/Product';

const ProductBlock = (): JSX.Element => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
    type: MODULE_NAME.M_PRODUCT_BLOCK,
  });

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommons } = settingPagesHooks.useUpdateTemplates();
  const { mutateAsync: createCommons } = settingPagesHooks.useCreateTemplates();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  const [skus, setSkus] = useState<{ label: string; value: string }[]>([]);
  const [skuSearch, setSkuSearch] = useState<{ name: string; slug: string }>();

  const { data: skuData, isLoading: isSkuDataLoading } = productsHooks.useProducts({
    pagination: {
      limit: 1000,
      offset: 0,
    },
    search: skuSearch,
    sort: {
      name: 'asc',
      isHidden: false,
    },
    autocompleted: true,
  });

  useEffect(() => {
    if (skuData && !isSkuDataLoading) {
      setSkus(skuData?.data?.map((item: any) => ({ label: item.name, value: item.slug })));
    }
  }, [isSkuDataLoading, skuData]);

  const handleSkuSearch = (value: string) => {
    setSkuSearch({ name: value, slug: value });
  };

  const onSkuSelect = (itemSelected: any) => {
    const data = productIds.find(item => item.value === itemSelected.value);
    if (!data) {
      setProductIds([...productIds, itemSelected]);
    }
  };

  const [updateItems, setUpdateItems] = useState<Common[]>([]);
  const [createItems, setCreateItems] = useState<Common[]>([]);

  const [productIdsItem, setProductIdsItem] = useState<Common>();
  const [productIds, setProductIds] = useState<{ label: string; value: string }[]>([]);
  const [initialValues, setInitialValues] = useState<any>([]);

  const saveProductIdsItem = useCallback(async () => {
    const data = productIds ? JSON.stringify(productIds) : '';
    if (productIds !== undefined) {
      if (productIdsItem) {
        if (data !== productIdsItem?.value) {
          updateItems.push({
            ...productIdsItem,
            type: MODULE_NAME.M_PRODUCT_BLOCK,
            value: data,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.PRODUCT_IDS,
          value: data,
          type: MODULE_NAME.M_PRODUCT_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [productIds, productIdsItem, updateItems, createItems]);

  const saveProduct = async () => {
    saveProductIdsItem();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
  };

  const resetProductIdsItem = useCallback(async () => {
    if (productIdsItem) {
      await deleteCommon(productIdsItem._id);
      setProductIds([]);
      form.setFieldValue('documents', [])
    }
  }, [productIdsItem, deleteCommon, form]);

  const resetProduct = async () => {
    await resetProductIdsItem();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const products = templateData.data?.find((item: any) => item.name === SETTINGS.PRODUCT_IDS);

      if (products) {
        setProductIdsItem(products);
        setProductIds(JSON.parse(products?.value));
        // setInitialValues({ documents: JSON.parse(products?.value) });
        // const form = Form.useFormInstance();
        form.setFieldValue('documents', JSON.parse(products?.value))
      }
    }
  }, [form, isLoadingTemplateData, templateData]);

  const onRemove = useCallback((indexItem: any) => {
    const data = productIds.filter((item, index) => index !== indexItem);
    setProductIds([...data]);
  }, [productIds]);
  
  return (
    <Card
      style={{ marginTop: 16 }}
      className="productBlock"
      type="inner"
      title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.product' })}
      extra={
        <Space direction="horizontal">
          <Button type="ghost" onClick={resetProduct}>
            {intl.formatMessage({ id: 'common.button.revert' })}
          </Button>
          <Button type="primary" onClick={saveProduct}>
            {intl.formatMessage({ id: 'common.button.update' })}
          </Button>
        </Space>
      }
    >
      {/* {!!initialValues && ( */}
        <Form
          // {...formItemLayout}
          form={form}
          name="update"
          onFinish={async values => {
            await saveProduct();
          }}
          // initialValues={initialValues || []}
          scrollToFirstError
        >
          <Form.List name="documents">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    // {...formItemLayout}
                    label={
                      index === 0
                        ? intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.productId' })
                        : ' '
                    }
                    required={false}
                    key={field.key}
                  >
                    <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Select
                        options={skus}
                        onSearch={handleSkuSearch}
                        onSelect={(value: any, option: any) => onSkuSelect(option)}
                        style={{ width: '80%' }}
                        showSearch
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          onRemove(index);
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item
                  // {...formItemLayout}
                  label={
                    fields.length === 0
                      ? intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.productId' })
                      : ' '
                  }
                >
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    {intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.add' })}
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      {/* )} */}
    </Card>
  );
};

export default ProductBlock;
