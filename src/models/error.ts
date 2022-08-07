export interface Error {
  errorInfo?: { errorCode: string };
  errorType: string;
  message?: string;
  details?: Object;
}

export interface ErrorResponse {
  response: {
    errors: Array<Error>;
  };
}
