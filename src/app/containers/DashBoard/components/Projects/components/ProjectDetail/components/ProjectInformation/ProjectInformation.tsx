import { Button, Descriptions, Form, InputNumber, Modal, Rate, Select, Tabs } from 'antd';
import { productsHooks } from 'app/containers/Admin/Product';
import { Product } from 'models/product';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import ProjectGallery from '../ProjectGallery/ProjectGallery';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './ProjectInformation.less';
import { Cart } from 'models/cart';
import { Document, Page, pdfjs } from 'react-pdf';
import { projectsHooks } from 'app/containers/Admin/Project';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { TabPane } = Tabs;
const { Option } = Select;

const ProjectInformation = (): JSX.Element => {
  const intl = useIntl();
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState<Product>({});
  const [tabIndex, setTabIndex] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const { data: projectDetailData, isLoading: isLoadingProjectDetail } = projectsHooks.useProject({ id });
  const [pdfViewerModalOpen, setPdfViewerModalOpen] = useState(false);

  useEffect(() => {
    if (projectDetailData && !isLoadingProjectDetail) {
      const data = {
        ...projectDetailData,
        description: decodeURIComponent(projectDetailData.description),
        specification: decodeURIComponent(projectDetailData.specification),
        slug: decodeURIComponent(projectDetailData.slug),
      };
      setProjectDetail(data);
    }
  }, [isLoadingProjectDetail, projectDetailData]);

  const onTabChange = (key: string) => {
    console.log(key);
    setTabIndex(key);
  };

  const onChange = (key: number) => {
    console.log(key);
    setQuantity(key);
  };

  const selectAfter = (
    <div>số lượng</div>
    // <Select defaultValue="USD" style={{ width: 60 }}>
    //   <Option value="USD">$</Option>
    // </Select>
  );

  const onFinish = async (value: any) => {
    const cartStringData = localStorage.getItem('shoppingCart');

    let cartData: Cart = {
      total: 0,
      orderItems: [
        {
          product: projectDetailData,
          total: 0,
          quantity: quantity,
        },
      ],
      customer: value,
    };

    if (cartStringData) {
      cartData = JSON.parse(cartStringData);
      const orderItem = cartData?.orderItems?.find(item => item.product?._id === projectDetail._id);

      if (orderItem) {
        orderItem.total = 0;
        orderItem.quantity += quantity;
      } else {
        cartData?.orderItems?.push({
          product: projectDetail,
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

  return (
    <div className="productInfo">
      <div className="productInfoBlock">
        <div className="carousel">
          <ProjectGallery images={projectDetail?.images} />
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: projectDetail?.description as string }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
