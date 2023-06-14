import { Contact } from 'models/contact';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import { contactsHooks } from 'app/containers/Admin/Contact';
import { ContactDetailForm } from '../ContactDetailForm';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUpdate = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutateAsync: updateContact, isLoading: isLoadingUpdateContact } = contactsHooks.useUpdateContact();
  const [contactDetail, setContactDetail] = useState<Contact>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: contactDetailData, isLoading: isLoadingContactDetail } = contactsHooks.useContact({ id });
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateContact({
      ...values,
      _id: contactDetailData?._id,
      // images: fileList,
    }).then((item: any) => {
      setContactDetail(item?.data);
      // setFileList(item?.data?.images);
      setDefaultValue({
        ...contactDetailData,
        description: decodeURIComponent(contactDetailData?.description),
        slug: decodeURIComponent(contactDetailData?.slug),
      });
    });
  }, [contactDetailData, updateContact])

  useEffect(() => {
    if (contactDetailData && !isLoadingContactDetail) {
      setContactDetail(contactDetailData);
      // setFileList(contactDetailData?.images);
      setDefaultValue({
        ...contactDetailData,
        description: decodeURIComponent(contactDetailData?.description),
        specification: decodeURIComponent(contactDetailData?.specification),
        slug: decodeURIComponent(contactDetailData?.slug),
      });
    }
  }, [contactDetailData, isLoadingContactDetail]);

  return defaultValue && <ContactDetailForm key={'contactUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingContactDetail || isLoadingUpdateContact} />
};

export default ContactUpdate;
