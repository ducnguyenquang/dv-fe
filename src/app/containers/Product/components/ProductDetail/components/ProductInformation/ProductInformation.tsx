import { Button, Collapse, Descriptions, Form, InputNumber, Modal, Rate, Tabs } from 'antd';
import { productsHooks } from 'app/containers/Admin/Product';
import { Product } from 'models/product';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ProductGallery from '../ProductGallery/ProductGallery';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './ProductInformation.less';
import { Cart } from 'models/cart';
import ProductRelated from '../../../ProductRelated/ProductRelated';
import { Document, Page, pdfjs } from 'react-pdf';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { ORIENTATION } from 'constants/common';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { TabPane } = Tabs;
// const { Option } = Select;

const ProductInformation = (): JSX.Element => {
  const intl = useIntl();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<Product>({});
  const [tabIndex, setTabIndex] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const { data: productDetailData, isLoading: isLoadingProductDetail } = productsHooks.useProduct({ id });
  const [pdfViewerModalOpen, setPdfViewerModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string>('');
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

  const getFileName = (pathFile: string) => {
    return pathFile.replace(/^.*[\\\/]/, '');
  };

  const getSelectedDocument = (pathFile: string) => {
    // const fileName = getFileName(pathFile);
    setPdfViewerModalOpen(true);
    setSelectedDocument(pathFile);
  };

  const closePdfModal = () => {
    setPdfViewerModalOpen(false);
    setSelectedDocument('');
  }

  const onTabChange = (key: string) => {
    console.log(key);
    setTabIndex(key);
  };

  const onChange = (key: number) => {
    console.log(key);
    setQuantity(key);
  };

  const selectAfter = useMemo(() => (
    <div>số lượng</div>
  ), []);

  const onFinish = async (value: any) => {
    const cartStringData = localStorage.getItem('shoppingCart');

    let cartData: Cart = {
      total: 0,
      orderItems: [
        {
          product: productDetailData,
          total: 0,
          quantity: quantity,
        },
      ],
      customer: value,
    };

    if (cartStringData) {
      cartData = JSON.parse(cartStringData);
      const orderItem = cartData?.orderItems?.find(item => item.product?._id === productDetail._id);

      if (orderItem) {
        orderItem.total = 0;
        orderItem.quantity += quantity;
      } else {
        cartData?.orderItems?.push({
          product: productDetail,
          total: 0,
          quantity: quantity,
        });
      }
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cartData));
  };

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // const downloadDocument = (url: string) => {
  //   navigate(url)
  // }

  return (
    <div className={`productInfo ${isMobile && orientation === ORIENTATION.PORTRAIT && 'productInfo-mobile'}`}>
      <div className="productInfoBlock">
        <div className="gallery">
          <ProductGallery images={productDetail?.images} />
        </div>
        <div className="content">
          <Descriptions className="information" title={productDetail?.name}>
            <Descriptions.Item span={3}>
              <Rate disabled defaultValue={4} />
            </Descriptions.Item>
            <Descriptions.Item span={3} className="summary">
              {productDetail?.summary}
            </Descriptions.Item>
            <Descriptions.Item span={3} className="specification">
              <div className="specificationItem">
                <span className="title">{intl.formatMessage({ id: 'product.sku' })}: </span>
                <span className="data">{productDetail?.slug ? decodeURIComponent(productDetail?.slug) : ''}</span>
              </div>
              <div className="specificationItem">
                <span className="title">{intl.formatMessage({ id: 'product.brand' })}: </span>
                <span className="data">{productDetail?.brand?.name}</span>
              </div>
              <div className="specificationItem">
                <span className="title">{intl.formatMessage({ id: 'product.categories' })}: </span>
                <span className="data">
                  {productDetail?.categories ? productDetail?.categories?.map(item => item.name) : ''}
                </span>
              </div>
            </Descriptions.Item>
          </Descriptions>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="" name="total">
              <div className="inputForm">
                <div className="price">{intl.formatMessage({ id: 'common.price.contactPlease' })}</div>
                <InputNumber min={1} defaultValue={1} onChange={onChange} addonAfter={selectAfter} className="input" />
                <Button type="primary" htmlType="submit" icon={<ShoppingCartOutlined />} className="button">
                  {intl.formatMessage({ id: 'product.button.cart' })}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      {!isMobile && <Tabs className="tabs" defaultActiveKey={tabIndex} onChange={onTabChange}>
        <TabPane tab={intl.formatMessage({ id: 'product.description' })} key="1">
          <div dangerouslySetInnerHTML={{ __html: productDetail?.description as string }}></div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'product.specification' })} key="2">
          <div dangerouslySetInnerHTML={{ __html: productDetail?.specification as string }}></div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'product.documents' })} key="3">
          <>
            {productDetail?.documents?.map(item => {
              const fileName = item.replace(/^.*[\\\/]/, '');
              return (
                <Button type="link" onClick={() => getSelectedDocument(item)}>
                  {fileName}
                </Button>
              );
            })}
            <div>
              {selectedDocument && <Modal
                title={getFileName(selectedDocument)}
                centered
                visible={pdfViewerModalOpen}
                onOk={() => closePdfModal()}
                destroyOnClose
                width={1000}
              >
                <Document
                  file={selectedDocument}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </Modal>}
            </div>
          </>
        </TabPane>
      </Tabs>}
      {isMobile && <Collapse className="collapses">
        <Collapse.Panel header={intl.formatMessage({ id: 'product.description' })} key="1">
          <div dangerouslySetInnerHTML={{ __html: productDetail?.description as string }}></div>
        </Collapse.Panel>
        <Collapse.Panel header={intl.formatMessage({ id: 'product.specification' })} key="2">
          <div dangerouslySetInnerHTML={{ __html: productDetail?.specification as string }}></div>
        </Collapse.Panel>
        <Collapse.Panel header={intl.formatMessage({ id: 'product.documents' })} key="3">
        <>
            {productDetail?.documents?.map(item => {
              const fileName = item.replace(/^.*[\\\/]/, '');
              return (
                <div><a href={item} target={'__blank'}>{fileName}</a></div>
              );
            })}
          </>
        </Collapse.Panel>
      </Collapse>}
      <ProductRelated categories={productDetail.categories} />
    </div>
  );
};

export default ProductInformation;
