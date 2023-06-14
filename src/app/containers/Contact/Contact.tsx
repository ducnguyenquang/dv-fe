import { Form, Input, Select, Button, Card, Tooltip } from 'antd';
import layout from 'antd/lib/layout';
import { useIntl } from 'react-intl';
import { getCities, getWards } from 'utils/location/location';
import { useCallback, useEffect, useState } from 'react';
import {
  HomeFilled,
  ShopFilled,
  PhoneFilled,
  FireFilled,
  ClockCircleFilled,
  AuditOutlined,
  MailFilled,
  GlobalOutlined,
  PrinterFilled,
} from '@ant-design/icons';
import './Contact.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { templatesHooks } from 'app/containers/Template';
import { useNavigate } from 'react-router-dom';
import { PAGE_NAME, SETTINGS } from 'constants/common';

const Contact = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [cities, setCities] = useState(getCities());
  const [wards, setWards] = useState<any[]>();

  const handleCityChange = (value: string) => {
    console.log(`selected ${value}`);
    setWards([]);
    // const code = value.split('-');
    setWards(getWards(value));
  };

  const { isMobile, orientation } = useContext(AppContext);

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_CONTACT,
      name: SETTINGS.COMPANY_INFORMATION,
    },
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  console.log('==== templateData', templateData);
   

  // useEffect(() => {
  //   if (templateData && !isLoadingTemplateData) {
  //     const leftImage = templateData.data?.find((item: any) => item.name === SETTINGS.COMPANY_INFORMATION);

  //     if (leftImage) {
  //       setLeftImage(leftImage?.valueImages?.[0]?.url as string);
  //     }
  //     if (leftText) {
  //       setLeftText(leftText?.value);
  //     }
  //     if (rightImage) {
  //       setRightImage(rightImage?.valueImages?.[0]?.url as string);
  //     }
  //     if (rightText) {
  //       setRightText(rightText?.value);
  //     }
  //   }
  // }, [isLoadingTemplateData, templateData]);

  const { mutateAsync: createContact, isLoading: isLoadingCreateContact } = templatesHooks.useCreateContact();

  const onFinish = useCallback(async (values: any) => {
    console.log('==== Contact values', values);
    // return;
    
    await createContact(values).then(() => {
      navigate('/');
    });
    
  },[createContact, navigate]);

  return (
    <div className={`contact ${isMobile && 'contact-mobile'} `}>
      <div className="customerInfo">
        <div className="title">{intl.formatMessage({ id: 'contact.customer.title' })}</div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className=""
          title={intl.formatMessage({ id: 'contact.customer.title' })}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item
            name={['name']}
            label={intl.formatMessage({ id: 'contact.customer.name' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['phone']}
            label={intl.formatMessage({ id: 'contact.customer.phone' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['city']}
            label={intl.formatMessage({ id: 'contact.customer.city' })}
            rules={[{ required: true }]}
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              onChange={handleCityChange}
            >
              {cities &&
                cities?.map((city: any) => {
                  return <Select.Option key={`${city.code}`}>{city.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['ward']}
            label={intl.formatMessage({ id: 'contact.customer.ward' })}
            rules={[{ required: true }]}
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              // onChange={handleChange}
            >
              {wards &&
                wards?.map((ward: any) => {
                  return <Select.Option key={ward.name}>{ward.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['address']}
            label={intl.formatMessage({ id: 'contact.customer.address' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'email'}
            label={intl.formatMessage({ id: 'contact.customer.email' })}
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['topic']}
            label={intl.formatMessage({ id: 'contact.customer.topic' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={intl.formatMessage({ id: 'contact.customer.content' })}
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isLoadingCreateContact}>
              {intl.formatMessage({ id: 'contact.button.send' })}
            </Button>
            <Button type="ghost">{intl.formatMessage({ id: 'contact.button.reset' })}</Button>
          </Form.Item>
        </Form>
      </div>
      {templateData?.data && templateData?.data.length > 0 ? (
        <div className="companyInfo"
          dangerouslySetInnerHTML={{ __html: templateData?.data?.[0]?.value }}
        />
      ) : (
      <Card title={intl.formatMessage({ id: 'contact.company.title' })} className="companyInfo">
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.address' })}>
            <span className="icon">
              <HomeFilled />
            </span>
          </Tooltip>
          103 Nguyễn Cữu Đàm, P. Tân Sơn Nhì, Q. Tân Phú, Tp. HCM
        </p>
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.showroom' })}>
            <span className="icon">
              <ShopFilled />
            </span>
          </Tooltip>
          93D Bờ Bao Tân Thắng, P.Sơn Kỳ, Q. Tân Phú, Tp. HCM
        </p>
        <p>
          <span>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.phone' })}>
              <span className="icon">
                <PhoneFilled />
              </span>
            </Tooltip>
            028.38428991
          </span>{' '}
          -
          <span>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.fax' })}>
              <span className="icon">
                <PrinterFilled />
              </span>
            </Tooltip>
            02838428992
          </span>{' '}
          -
          <span>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.taxId' })}>
              <span className="icon">
                <AuditOutlined />
              </span>
            </Tooltip>
            0313154752
          </span>
        </p>
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.hotline' })}>
            <span className="icon">
              <FireFilled />
            </span>
          </Tooltip>
          090.233.2665 - 090.909.3426
        </p>
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.workingTime' })}>
            <span className="icon">
              <ClockCircleFilled />
            </span>
          </Tooltip>
          8h00 - 17h00 (Thứ 2 - Thứ 7)
        </p>
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.email' })}>
            <span className="icon">
              <MailFilled />
            </span>
          </Tooltip>
          capdaiviet@gmail.com
        </p>
        <p>
          <Tooltip title={intl.formatMessage({ id: 'contact.company.website' })}>
            <span className="icon">
              <GlobalOutlined />
            </span>
          </Tooltip>
          www.leddaiviet.com - www.daiviet-e.com
        </p>
      </Card>)}
    </div>
  );
};

export default Contact;
