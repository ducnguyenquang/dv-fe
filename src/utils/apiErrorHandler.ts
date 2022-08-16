import { errorMessage } from 'common/components/Toast';
import { message } from 'antd';
import { Error } from 'models/error';

export const apiErrorHandler = (errors: Array<Error>): void => {
  if (errors?.length) {
    errors.forEach((error: Error) => {
      // TODO: add INTL when BE puts list of error types in cc-commons repo
      // errorMessage({ id: error.errorType , values: error.details});

      if (error?.errorInfo?.errorCode === 'EMPLOYEE_DUPLICATE_PHONE_NUMBER') {
        errorMessage({ id: 'errors.employees.duplicate_phone' });
        message.error(error.message);
      } else if (error?.errorInfo?.errorCode === 'EMPLOYEE_DUPLICATE_EMAIL') {
        errorMessage({ id: 'errors.employees.duplicate_email' });
        message.error(error.message);
      } else {
        message.error(error.message);
        errorMessage({ errorMessage: error.message });
      }
    });
  }
};
