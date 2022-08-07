import { errorMessage } from 'common/components/Toast';
import { Error } from 'models/error';

export const apiErrorHandler = (errors: Array<Error>): void => {
  if (errors?.length) {
    errors.forEach((error: Error) => {
      // TODO: add INTL when BE puts list of error types in cc-commons repo
      // errorMessage({ id: error.errorType , values: error.details});

      if (error?.errorInfo?.errorCode === 'EMPLOYEE_DUPLICATE_PHONE_NUMBER') {
        errorMessage({ id: 'errors.employees.duplicate_phone' });
      } else if (error?.errorInfo?.errorCode === 'EMPLOYEE_DUPLICATE_EMAIL') {
        errorMessage({ id: 'errors.employees.duplicate_email' });
      } else {
        errorMessage({ errorMessage: error.message });
      }
    });
  }
};
