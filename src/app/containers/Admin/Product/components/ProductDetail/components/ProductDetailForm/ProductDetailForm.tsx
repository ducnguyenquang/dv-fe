import { Button, Form, Input, Select, Card, Switch, Tooltip, AutoComplete, Tag, Space, InputNumber } from 'antd';
import { Category } from 'models/category';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { productsHooks } from 'app/containers/Admin/Product';
import type { UploadFile } from 'antd/es/upload/interface';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { brandsHooks } from 'app/containers/Admin/Brand';
import { Brand } from 'models/brand';
import { TYPES, TYPE_OPTIONS } from 'constants/type';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

import './ProductDetailForm.less';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { generateSku } from 'utils/string';
import { settingsHooks } from 'app/containers/Admin/Setting';
import ColorPicker from 'app/containers/Admin/SettingPage/components/Template/components/ColorPicker/ColorPicker';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { formatListToParts } from '@formatjs/intl/src/list';
import { COLOR_OPTIONS, COLOR_TEMPERATURE_OPTIONS } from 'constants/common';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps {
  isUpdate?: boolean;
  onFinish?: any;
  data?: any;
  isLoading?: boolean;
}

const ProductDetailForm = ({ isUpdate, onFinish, data, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [sku, setSku] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [powers, setWatts] = useState<string[]>([]);

  // const colorTemperatureOptions = [
  //   {
  //     key: '2700K-3500K',
  //     label: `2700K-3500K`,
  //     value: {
  //       value: 'V',
  //       color: '#FFFD5E',
  //     },
  //   },
  //   {
  //     key: '4000K-4500K',
  //     label: `4000K-4500K`,
  //     // value: 'TT',
  //     // color: '#FFFCBC',
  //     value: {
  //       value: 'TT',
  //       color: '#FFFCBC',
  //     },
  //   },
  //   {
  //     key: '6000K-6500K',
  //     label: `6000K-6500K`,
  //     // value: 'T',
  //     // color: '#F9FDFE',
  //     value: {
  //       value: 'T',
  //       color: '#F9FDFE',
  //     },
  //   },
  // ];

  

  const [initialValues, setInitialValues] = useState(data);

  useEffect(() => {
    if (!initialValues && data) {
      setInitialValues({
        ...data,
        powers: [
          {
            power: '',
            quantity: 0,
          },
        ],
      });
    }
  }, [data, initialValues]);

  const [search, setSearch] = useState({
    type: initialValues?.type,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    search: search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { data: brandsData, isLoading: isLoadingBrandsData } = brandsHooks.useBrands({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.images : []);

  const onNameChange = (value: string) => {
    const id = generateSku(value);
    setSku(id);
  };

  useEffect(() => {
    if (brandsData && !isLoadingBrandsData) {
      setBrands(brandsData.data);
    }
  }, [brandsData, isLoadingBrandsData]);

  useEffect(() => {
    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData, isLoadingCategories]);

  useEffect(() => {
    if (sku) form.setFieldsValue({ slug: sku });
  }, [form, sku]);

  // useEffect(() => {
  //   if (colors) form.setFieldsValue({ colors });
  // }, [colors, form]);

  const onSelectedType = (value: string) => {
    form.setFieldsValue({ categories: undefined });
    const searchData = {
      type: value,
    };
    const dataForm = form.getFieldsValue();

    form.setFieldsValue({
      ...dataForm,
      colors: initialValues && value !== initialValues?.type ? [] : initialValues ? initialValues?.color : '',
    });
    // form.validateFields()
    setSearch(searchData);
  };

  const [skus, setSkus] = useState<{ value: string }[]>([]);
  const [skuSearch, setSkuSearch] = useState<string>('');

  const { data: skuData, isLoading: isSkuDataLoading } = settingsHooks.useSkus({
    pagination: {
      limit: 1000,
      offset: 0,
    },
    search: skuSearch,
    sort: {
      name: 'asc',
    },
  });

  useEffect(() => {
    if (skuData && (!isLoading || !isSkuDataLoading)) {
      setSkus(skuData?.data);
    }
  }, [isLoading, isSkuDataLoading, skuData]);

  const handleSkuSearch = (value: string) => {
    setSkuSearch(value);
  };

  const onSkuSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const onColorSelected = useCallback(
    (itemIndex: number, value: string) => {
      const colors = form.getFieldValue('colors');

      if (colors.length >= itemIndex) {
        colors[itemIndex] = value;
        // setColors(colors);
        form.setFieldValue('colors', colors);
      } else {
        // setColors([...colors, value]);
        form.setFieldValue('colors', [...colors, value]);
      }
    },
    [form]
  );

  const onColorRemoved = useCallback(
    (itemIndex: number) => {
      colors.splice(itemIndex, 1);
      setColors(colors);
    },
    [colors]
  );

  const onColorDropDownSelected = useCallback((value: string[], option: any) => {
    setColors(value);
  }, []);

  // const tagColorRender = (props: any) => {
  //   const { key, label, value, color, closable, onClose } = props;
  //   const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };

  //   return (
  //     <Tag
  //       key={key}
  //       color={color}
  //       onMouseDown={onPreventMouseDown}
  //       closable={closable}
  //       onClose={onClose}
  //       style={{ marginRight: 3 }}
  //     >
  //       {label}
  //     </Tag>
  //   );
  // };

  const colorOptions = useMemo(() => {
    if (initialValues) {
      return COLOR_OPTIONS.map(c => ({
        label: c.label,
        value: c.value,
      }));
      // }
    }
  }, [initialValues]);

  return (
    <div className="productDetailForm">
      <Helmet title={intl.formatMessage({ id: 'page.name.productDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.productDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/products`)}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async values => {
            const data = {
              ...values,
              description: encodeURIComponent(values.description),
              specification: encodeURIComponent(values.specification),
              slug: encodeURIComponent(values.slug),
              images: fileList,
              // colors: colors,
              powers: values.powers.map((item: any) => ({
                power: item.power,
                quantity: item.quantity,
                price: item.price,
                colorTemperature: item.colorTemperature || undefined,
              })),
              type: values.type === undefined ? '' : values.type,
            };

            await onFinish(data).then(() => navigate(`/admin/products`));
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'product.productName' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.productName' }) }
                ),
              },
            ]}
          >
            <Input onChange={e => onNameChange(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'product.slug' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.slug' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <AutoComplete options={skus} style={{ width: 200 }} onSelect={onSkuSelect} onSearch={handleSkuSearch}>
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="brand"
            label={intl.formatMessage({ id: 'product.brand' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.brand' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select id="brand" allowClear placeholder={intl.formatMessage({ id: 'product.brand.placeholder' })}>
              {brands &&
                brands.map((item: any) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label={intl.formatMessage({ id: 'product.type' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.type' }) }
                ),
              },
            ]}
          >
            <Select
              allowClear
              placeholder={intl.formatMessage({ id: 'product.type.placeholder' })}
              onClear={() => onSelectedType('')}
              onChange={value => onSelectedType(value)}
            >
              {TYPE_OPTIONS.map((item: any) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="categories"
            label={intl.formatMessage({ id: 'product.categories' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.categories' }) }
                ),
              },
            ]}
          >
            <Select
              // key="categorySelect"
              id="categories"
              allowClear
              mode="multiple"
              placeholder={intl.formatMessage({ id: 'product.categories.placeholder' })}
            >
              {categories &&
                categories.map((item: any) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="summary" label={intl.formatMessage({ id: 'product.summary' })}>
            <Input.TextArea showCount maxLength={300} value={initialValues?.summary} />
          </Form.Item>

          <Form.Item name="description" label={intl.formatMessage({ id: 'product.description' })}>
            <Editor value={description} onChange={setDescription} />
          </Form.Item>
          <Form.Item name="specification" label={intl.formatMessage({ id: 'product.specification' })}>
            <Editor value={specification} onChange={setSpecification} />
          </Form.Item>

          <Form.Item
            label={
              <>
                {intl.formatMessage({ id: 'product.images' })}
                <Tooltip title="400*400 (px)">
                  <QuestionCircleOutlined style={{ marginLeft: '1rem', color: '#E5704B' }} />
                </Tooltip>
              </>
            }
          >
            <ImageUpload fileList={fileList} ratio={1 / 1} setFileList={setFileList} imageNumber={5} />
          </Form.Item>
          <Form.Item
            name="order"
            label={intl.formatMessage({ id: 'setting.topMenu.order' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.topMenu.order' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <InputNumber defaultValue={initialValues?.order || 0} />
          </Form.Item>
          <Form.Item name="isHidden" label={intl.formatMessage({ id: 'product.isHidden' })}>
            <Switch defaultChecked={initialValues?.isHidden} />
          </Form.Item>
          {search.type === TYPES.DEN_LED && (
            <Form.List name="colors">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        {...formItemLayout}
                        label={index === 0 ? intl.formatMessage({ id: 'product.color' }) : ' '}
                        required={false}
                        key={field.key}
                        className="colors"
                        name="colors"
                      >
                        <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                          <ColorPicker
                            initialColor={
                              initialValues?.colors[field.name] ? initialValues?.colors[field.name] : undefined
                            }
                            saveColor={(selectedColor: any) => onColorSelected(index, selectedColor)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                              onColorRemoved(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    );
                  })}
                  <Form.Item
                    {...formItemLayout}
                    label={fields.length === 0 ? intl.formatMessage({ id: 'product.color' }) : ' '}
                  >
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      {intl.formatMessage({ id: 'product.button.addColor' })}
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}
          {search.type === TYPES.CAP_DIEN && (
            <Form.Item
              {...formItemLayout}
              label={intl.formatMessage({ id: 'product.color' })}
              required={false}
              className="colors"
              name="colors"
            >
              <Select
                mode="multiple"
                showArrow
                defaultValue={initialValues?.colors}
                style={{ width: '100%' }}
                options={colorOptions}
                onChange={onColorDropDownSelected}
              />
            </Form.Item>
          )}

          {search.type && (
            <Form.List name="powers">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        {...formItemLayout}
                        label={
                          index === 0
                            ? search.type === TYPES.DEN_LED
                              ? intl.formatMessage({ id: 'product.power' })
                              : intl.formatMessage({ id: 'product.specifications' })
                            : ' '
                        }
                        required={false}
                        key={field.key}
                        className="powers"
                      >
                        <Form.Item noStyle>
                          <Form.Item
                            {...field}
                            name={[field.name, 'power']}
                            validateTrigger={['onChange', 'onBlur']}
                            className="power"
                          >
                            <Input
                              placeholder={
                                search.type === TYPES.DEN_LED
                                  ? intl.formatMessage({ id: 'product.power' })
                                  : intl.formatMessage({ id: 'product.specifications' })
                              }
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label={intl.formatMessage({ id: 'product.quantity' })}
                          name={[field.name, 'quantity']}
                          validateTrigger={['onChange', 'onBlur']}
                          className="quantity"
                        >
                          <Input placeholder={intl.formatMessage({ id: 'product.quantity' })} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label={intl.formatMessage({ id: 'product.price' })}
                          name={[field.name, 'price']}
                          validateTrigger={['onChange', 'onBlur']}
                          className="price"
                        >
                          <Input placeholder={intl.formatMessage({ id: 'product.price' })} />
                        </Form.Item>
                        {search.type === TYPES.DEN_LED && (
                          <Form.Item
                            {...field}
                            label={intl.formatMessage({ id: 'product.color_temperature' })}
                            validateTrigger={['onChange', 'onBlur']}
                            name={[field.name, 'colorTemperature']}
                            className="colorTemperature"
                          >
                            <Select
                              id="colorTemperatures"
                              placeholder={intl.formatMessage({ id: 'product.color_temperature' })}
                            >
                              {COLOR_TEMPERATURE_OPTIONS.map(item => {
                                return (
                                  <Option
                                    style={{ backgroundColor: item.color }}
                                    value={item.value}
                                    label={item.label}
                                  >
                                    <Space>{item.label}</Space>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        )}
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Form.Item>
                    );
                  })}
                  <Form.Item
                    {...formItemLayout}
                    label={
                      fields.length === 0
                        ? search.type === TYPES.DEN_LED
                          ? intl.formatMessage({ id: 'product.power' })
                          : intl.formatMessage({ id: 'product.specifications' })
                        : ' '
                    }
                  >
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      {intl.formatMessage({ id: 'product.button.addWatt' })}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isUpdate
                ? intl.formatMessage({ id: 'common.button.update' })
                : intl.formatMessage({ id: 'common.button.add' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductDetailForm;
