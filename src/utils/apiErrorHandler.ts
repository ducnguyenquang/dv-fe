
import { Error } from 'models/error';
import { message } from 'antd';

export const apiErrorHandler = (errors: Array<Error> | any): void => {
  if (errors?.length) {
    errors.forEach((error: Error) => {
      message.error(error?.message);
    });
  } else { 
    message.error(errors?.message);
  }

};
