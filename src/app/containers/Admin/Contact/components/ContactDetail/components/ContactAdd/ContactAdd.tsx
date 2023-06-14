import { contactsHooks } from 'app/containers/Admin/Contact';
import { ContactDetailForm } from '../ContactDetailForm';
import { useCallback } from 'react';

const ContactAdd = (): JSX.Element => {
  const { mutateAsync: createContact, isLoading: isLoadingCreateContact } = contactsHooks.useCreateContact();

  const onFinish = useCallback(async (values: any) => {
    await createContact(values);
  },[createContact]);

  return <ContactDetailForm key={'contactAdd'} onFinish={onFinish} isLoading={isLoadingCreateContact} />;
};

export default ContactAdd;
