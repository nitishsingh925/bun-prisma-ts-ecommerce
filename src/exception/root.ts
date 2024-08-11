export class HttpException extends Error {
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors?: any
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors || null;
  }
}

// Enum for error codes
export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
}
