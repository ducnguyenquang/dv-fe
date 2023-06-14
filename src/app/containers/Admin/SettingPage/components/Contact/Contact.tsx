import { Card, Button, Space } from 'antd';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { settingPagesHooks } from '../../hooks';
import './Contact.less';
import Editor from 'app/components/Editor/TinymceEditor';

const Contact = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_CONTACT,
  });

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommon } = settingPagesHooks.useUpdateTemplate();
  const { mutateAsync: createCommon } = settingPagesHooks.useCreateTemplate();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  const [companyInformationItem, setCompanyInformationItem] = useState<Common>();
  const [companyInformation, setCompanyInformation] = useState<string>();

  const saveCompanyInformation = useCallback(async () => {
    if (companyInformationItem) {
      await updateCommon({
        ...companyInformationItem,
        value: companyInformation,
      });
    } else {
      await createCommon({
        name: SETTINGS.COMPANY_INFORMATION,
        value: companyInformation,
        group: PAGE_NAME.P_CONTACT,
      });
    }
  }, [companyInformationItem, updateCommon, companyInformation, createCommon]);

  const saveContact = async () => {
    await saveCompanyInformation();
  };

  const resetCompanyInformation = useCallback(async () => {
    if (companyInformationItem) {
      await deleteCommon(companyInformationItem._id);
      setCompanyInformation('');
    }
  }, [companyInformationItem, deleteCommon]);

  const resetContact = async () => {
    await resetCompanyInformation();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const companyInformationTemp = templateData.data?.find((item: any) => item.name === SETTINGS.COMPANY_INFORMATION);

      if (companyInformationTemp) {
        setCompanyInformationItem(companyInformationTemp);
        setCompanyInformation(companyInformationTemp?.value);
      }

    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'admin.settingPage.contact.title-page' })} />
      <Card
        title={intl.formatMessage({ id: 'admin.settingPage.contact.title-page' })}
        extra={
          <Space direction="horizontal">
            <Button type="ghost" onClick={resetContact}>
              {intl.formatMessage({ id: 'common.button.revertAll' })}
            </Button>
            <Button type="primary" onClick={saveContact}>
              {intl.formatMessage({ id: 'common.button.updateAll' })}
            </Button>
          </Space>
        }
      >
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.contact.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetCompanyInformation}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveCompanyInformation}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <Editor value={companyInformation} onChange={setCompanyInformation} />
        </Card>
      </Card>
    </>
  );
};

export default Contact;
