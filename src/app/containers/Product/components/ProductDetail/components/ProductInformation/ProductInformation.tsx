import { Button, Collapse, Descriptions, Form, Input, message, Radio, Rate, Select, Tabs, Tag } from 'antd';
import { templatesHooks } from 'app/containers/Template';
import { Product } from 'models/product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../ProductGallery/ProductGallery';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './ProductInformation.less';
import { Cart } from 'models/cart';
import ProductRelated from '../../../ProductRelated/ProductRelated';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { COLOR_OPTIONS, COLOR_TEMPERATURE_OPTIONS, ORIENTATION } from 'constants/common';
import { numberWithCommas } from 'utils/string';
import { TYPES } from 'constants/type';

const { TabPane } = Tabs;

const ProductInformation = (): JSX.Element => {
  const intl = useIntl();
  const { id } = useParams();
  const [form] = Form.useForm();

  const [productDetail, setProductDetail] = useState<Product>({});
  const [tabIndex, setTabIndex] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const { data: productDetailData, isLoading: isLoadingProductDetail } = templatesHooks.useProduct({ id });
  // const [pdfViewerModalOpen, setPdfViewerModalOpen] = useState(false);
  const [color, setColor] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [powerValues, setPowerValues] = useState<string[]>([]);
  const [productSku, setProductSku] = useState<string>();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();
  const [colorTemperature, setColorTemperature] = useState();
  const { isMobile, orientation } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (productDetailData && !isLoadingProductDetail) {
      const data = {
        ...productDetailData,
        description: decodeURIComponent(productDetailData.description),
        specification: decodeURIComponent(productDetailData.specification),
        slug: decodeURIComponent(productDetailData.slug),
      };
      setProductDetail(data);
    }
  }, [isLoadingProductDetail, productDetailData]);
  // console.log('==== productDetailData', productDetailData);

  const getFileName = (pathFile: string) => {
    return pathFile.replace(/^.*[\\\/]/, '');
  };

  const onTabChange = (key: string) => {
    setTabIndex(key);
  };

  const onQuantityChange = (item: any) => {
    const quantity = item.target.value as number;
    console.log('==== onQuantityChange quantity', quantity);
    console.log('==== onQuantityChange status', status);
    
    setQuantity(status && quantity > status ? 1 : quantity);
  };

  const getProductSku = useMemo(() => {
    const productSku = productDetail?.slug ? decodeURIComponent(productDetail?.slug) : '';
    const productPower = power ? `-${power.replace(/[^\d.-]+/g, '')}` : '';
    const productColorTemperature = colorTemperature ? `-${colorTemperature}` : '';
    const sku = `${productSku}${productPower}${productColorTemperature}`;
    // setProductSku(sku);
    return sku;
  }, [colorTemperature, power, productDetail?.slug]);

  const onFinish = useCallback(
    async (value: any) => {
      const cartStringData = localStorage.getItem('shoppingCart');
      const sku = getProductSku;
      let cartData: Cart = {
        total: 0,
        orderItems: [
          {
            product: productDetailData,
            total: 0,
            quantity: quantity,
            sku: sku,
            price: price,
          },
        ],
        // customer: value,
      };

      if (cartStringData) {
        cartData = JSON.parse(cartStringData);
        const orderItem = cartData?.orderItems?.find(item => item?.sku === sku);

        if (orderItem) {
          orderItem.total = 0;
          orderItem.quantity += quantity;
        } else {
          cartData?.orderItems?.push({
            product: productDetail,
            total: 0,
            quantity: quantity,
            color: color,
            power: power,
            colorTemperature: colorTemperature,
            sku: sku,
            price: price,
          });
        }
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cartData));

      message.success(
        intl.formatMessage({ id: 'cart.notification.content.adding.success' }, { name: productDetail.name })
      );
    },
    [color, colorTemperature, getProductSku, intl, power, price, productDetail, productDetailData, quantity]
  );

  const onSelectColorChange = useCallback((value: string) => {
    setColor(value);
  }, []);

  const onColorChange = useCallback((value: any) => {
    setColor(value.target.value);
  }, []);

  const resetForm = useCallback(() => {
    setPower('');
    setPowerValues([]);
    setPrice(undefined);
    setStatus(undefined);
    setColorTemperature(undefined);
    setQuantity(1);
  }, []);

  const onPowerChange = useCallback(
    (value: any) => {
      resetForm();
      const powerValue = value ? JSON.parse(value) : undefined;
      setPower(powerValue?.[0]?.power);
      setPowerValues(powerValue);
      setPrice(powerValue?.[0].price);
      setStatus(powerValue?.[0].quantity);
      let realQuantity = quantity
      if (realQuantity > powerValue?.[0].quantity) {
        realQuantity = 1;
        form.setFieldValue('quantity', 1)
      }
      setQuantity(realQuantity);
    },
    [form, quantity, resetForm]
  );

  const onColorTemperatureChange = useCallback(
    (value: string) => {
      const colorData = powerValues.filter((item: any) => item.power === power && item.colorTemperature === value);
      const powerValue = colorData?.[0] as any;
      setPrice(powerValue?.price);
      setStatus(powerValue?.quantity);
      setColorTemperature(value as any);
      setQuantity(quantity > powerValue?.quantity ? 1 : quantity);
    },
    [power, powerValues, quantity]
  );

  const renderGroupColor = useCallback(() => {
    let options = undefined;

    switch (productDetail.type) {
      case TYPES.CAP_DIEN:
        options = COLOR_OPTIONS.filter(color => productDetail.colors?.indexOf(color.value) !== -1);
        break;
      case TYPES.DEN_LED:
        options =
          productDetail.colors?.map(item => ({
            label: <div style={{ backgroundColor: item, width: '100%', height: '100%' }} />,
            value: item,
          })) || [];
        break;
      default:
        break;
    }

    if (productDetail.type === TYPES.CAP_DIEN) {
    }

    // console.log('====options ', options);

    return productDetail.type === TYPES.CAP_DIEN ? (
      <Select
        // defaultValue="lucy"
        allowClear
        style={{ width: '160px' }}
        onChange={onSelectColorChange}
        options={options}
        className="colors"
      />
    ) : (
      <Radio.Group
        name={'color'}
        options={options}
        onChange={onColorChange}
        value={color}
        optionType="button"
        buttonStyle="solid"
      />
    );
  }, [color, onColorChange, onSelectColorChange, productDetail.colors, productDetail.type]);

  const renderPower = useCallback(
    ({
      data,
      onChange,
      value,
      name,
    }: {
      data: string[];
      onChange: (value: any) => void;
      value: string;
      name: string;
    }) => {
      let options: any[] = [];
      const powers = Array.from(new Set(data?.map((item: any) => item.power)));

      switch (name) {
        case 'power':
          options = powers.map((power: any) => ({
            label: power,
            value: JSON.stringify(data?.filter((item: any) => item.power === power)),
          }));
          break;
        case 'colorTemperature':
          if (power) {
            const powerData = data?.filter((item: any) => item.power === power);
            const colorTemperatures = Array.from(new Set(powerData?.map((item: any) => item.colorTemperature)));

            options = colorTemperatures?.map((item: any) => {
              const color = COLOR_TEMPERATURE_OPTIONS.find(c => c.value === item);

              return {
                label: color?.label,
                value: color?.value,
                // style: { backgroundColor: color?.color },
              };
            });

            console.log('==== options', options);
          }

          break;

        default:
          break;
      }

      return (
        options.length > 0 && (
          <Select allowClear style={{ width: name === 'power' ? 120 : 160 }} onChange={onChange} options={options} />
        )
      );
    },
    [power]
  );

  const isDisableSubmitButton = useMemo(() => {
    let isDisabled = false;

    if (productDetail.colors && productDetail.colors.length > 0 && !color) {
      isDisabled = true;
    }
    if (productDetail.powers && productDetail.powers.length > 0 && !power) {
      isDisabled = true;
    }
    if (
      productDetail.type === TYPES.DEN_LED &&
      productDetail.colorTemperatures &&
      productDetail.colorTemperatures.length > 0 &&
      !colorTemperature
    ) {
      isDisabled = true;
    }
    return isDisabled;
  }, [
    color,
    colorTemperature,
    power,
    productDetail.colorTemperatures,
    productDetail.colors,
    productDetail.powers,
    productDetail.type,
  ]);

  const changeQuantity = useCallback(
    (number: number) => {
      setQuantity(number);
      form.setFieldsValue({ quantity: number });
    },
    [form]
  );

  const onQuantityAdd = useCallback(() => {
    changeQuantity(quantity + 1);
  }, [changeQuantity, quantity]);

  const onQuantityMinus = useCallback(() => {
    changeQuantity(quantity > 1 ? quantity - 1 : 1);
  }, [changeQuantity, quantity]);

  // console.log('==== quantity', quantity);

  const quantityAdding = (
    <Button disabled={isDisableSubmitButton} type="link" icon={<PlusOutlined />} onClick={onQuantityAdd} />
  );
  const quantityMinus = (
    <Button disabled={isDisableSubmitButton} type="link" icon={<MinusOutlined />} onClick={onQuantityMinus} />
  );

  return (
    <div className={`productInfo ${isMobile && orientation === ORIENTATION.PORTRAIT && 'productInfo-mobile'}`}>
      <div className="productInfo-block">
        <div className="gallery">
          <ProductGallery images={productDetail?.images} />
        </div>
        <div className="content">
          <Descriptions className="information" title={productDetail?.name}>
            <Descriptions.Item span={3}>
              <Rate disabled defaultValue={4} />
            </Descriptions.Item>
            <Descriptions.Item span={3}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                form={form}
                autoComplete="off"
                style={{ width: '100%' }}
              >
                <div className="inputForm">
                  <div className="informationBlock">
                    <div className="totalBlock">
                      <div className="price">
                        {price ? numberWithCommas(price) : intl.formatMessage({ id: 'common.price.contactPlease' })}
                      </div>
                      <div className="total">
                        <Form.Item
                          label={intl.formatMessage({ id: 'product.quantity' })}
                          name="quantity"
                          className="quantityInput"
                        >
                          <Input
                            // addonBefore={quantityMinus}
                            // addonAfter={quantityAdding}
                            min={1}
                            max={status ? status : undefined}
                            type="number"
                            defaultValue={quantity}
                            onChange={onQuantityChange}
                            disabled={isDisableSubmitButton}
                          />
                        </Form.Item>
                        <div className="buttons">
                          <Button
                            type="primary"
                            // htmlType="submit"
                            // icon={<ShoppingCartOutlined />}
                            onClick={() => onFinish(form.getFieldsValue()).then(() => navigate('/cart'))}
                            className="button-buyNow"
                            disabled={isDisableSubmitButton}
                          >
                            {intl.formatMessage({ id: 'product.button.buyNow' })}
                          </Button>
                          <Button
                            type="primary"
                            htmlType="submit"
                            // icon={<ShoppingCartOutlined />}
                            className="button-cart"
                            disabled={isDisableSubmitButton}
                          >
                            {intl.formatMessage({ id: 'product.button.cart' })}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {
                      <div className="specsBlock">
                        <Form.Item label={intl.formatMessage({ id: 'product.color' })} name="color" className={`colors ${productDetail.type === TYPES.CAP_DIEN && 'colors--cap-dien'}`}>
                          {productDetail.colors && productDetail.colors.length > 0 && renderGroupColor()}
                        </Form.Item>

                        <Form.Item
                          label={
                            productDetail.type === TYPES.DEN_LED
                              ? intl.formatMessage({ id: 'product.power' })
                              : intl.formatMessage({ id: 'product.specifications' })
                          }
                          name="power"
                          className="power"
                        >
                          {productDetail.powers &&
                            productDetail.powers?.length > 0 &&
                            renderPower({
                              name: 'power',
                              data: productDetail.powers,
                              onChange: onPowerChange,
                              value: power,
                            })}
                        </Form.Item>
                        <Form.Item
                          label={
                            productDetail.type === TYPES.DEN_LED
                              ? intl.formatMessage({ id: 'product.color_temperature' })
                              : ''
                          }
                          name="colorTemperature"
                          className="colorTemperature"
                        >
                          {productDetail.type === TYPES.DEN_LED &&
                            productDetail.powers &&
                            productDetail.powers?.length > 0 &&
                            renderPower({
                              name: 'colorTemperature',
                              data: productDetail.powers,
                              onChange: onColorTemperatureChange,
                              value: colorTemperature as any,
                            })}
                        </Form.Item>

                        <Form.Item label={intl.formatMessage({ id: 'product.status' })} name="status">
                          {status && <div className="colors">{status}</div>}
                        </Form.Item>
                      </div>
                    }
                  </div>
                </div>
              </Form>
            </Descriptions.Item>
            {/* <Descriptions.Item span={3} className="summary">
              {productDetail?.summary}
            </Descriptions.Item> */}
            <Descriptions.Item span={3} className="specification">
              <div className="specificationItem">
                <span className="title">{`${intl.formatMessage({ id: 'product.sku' })}:`} </span>
                <span className="data">
                  <Tag>{getProductSku}</Tag>
                </span>
              </div>
              <div className="specificationItem">
                <span className="title">{intl.formatMessage({ id: 'product.brand' })}: </span>
                <span className="data">
                  <Tag>{productDetail?.brand?.name}</Tag>
                </span>
              </div>
              <div className="specificationItem specificationItem-categories">
                <span className="title">{intl.formatMessage({ id: 'product.categories' })}: </span>
                <span className="data">
                  {productDetail?.categories
                    ? productDetail?.categories?.map(item => <Tag key={item._id}>{item.name}</Tag>)
                    : ''}
                </span>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <div className="description">
        <div className="summary">{productDetail?.summary}</div>
      </div>
      {!isMobile && (
        <Tabs className="tabs" defaultActiveKey={tabIndex} onChange={onTabChange}>
          <TabPane tab={intl.formatMessage({ id: 'product.description' })} key="1">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: productDetail?.description as string }}
            ></div>
          </TabPane>
          <TabPane tab={intl.formatMessage({ id: 'product.specification' })} key="2">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: productDetail?.specification as string }}
            ></div>
          </TabPane>
        </Tabs>
      )}
      {isMobile && (
        <Collapse className="collapses">
          <Collapse.Panel header={intl.formatMessage({ id: 'product.description' })} key="1">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: productDetail?.description as string }}
            ></div>
          </Collapse.Panel>
          <Collapse.Panel header={intl.formatMessage({ id: 'product.specification' })} key="2">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: productDetail?.specification as string }}
            ></div>
          </Collapse.Panel>
        </Collapse>
      )}
      <ProductRelated categories={productDetail.categories} />
    </div>
  );
};

export default ProductInformation;
