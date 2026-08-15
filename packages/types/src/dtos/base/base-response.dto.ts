import {
  BadRequestException,
  ConflictException,
  Exception,
  ExceptionMessageType,
  InternalServerException,
  NotFoundException,
  UnauthenticatedException,
  UnauthorizedException,
  UnknownException,
} from "../../exceptions";

// BaseResponse
// BaseResponse without suffix Dto => not long name
export class BaseResponse<T> {
  constructor(status: number, data: T | null, error?: Exception) {
    this.status = status;
    this.data = data;
    this.error = error;
  }

  status: number;

  data: T | null;

  error?: Exception;

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      status: this.status,
      error: this.error ? this.error.toJSON() : undefined,
    };
  }

  get success(): boolean {
    return !this.error && [200, 201].includes(this.status);
  }

  static success<T>(data: T): BaseResponse<T> {
    return new BaseResponse<T>(200, data);
  }

  static conflict<T>(
    message: ExceptionMessageType = "Conflict exception",
  ): BaseResponse<T> {
    return BaseResponse.error(Exception.conflict(message));
  }

  static notFound<T>(
    params: { type?: string; id?: any } = {},
  ): BaseResponse<T> {
    return BaseResponse.error(Exception.notFound(params));
  }

  static badRequest<T>(
    message: ExceptionMessageType = "Bad request",
  ): BaseResponse<T> {
    return BaseResponse.error(Exception.badRequest(message));
  }

  static internalServerError<T>(): BaseResponse<T> {
    return BaseResponse.error(Exception.internalError());
  }

  static unkonwnError<T>(
    message: ExceptionMessageType = "Unknown exception",
  ): BaseResponse<T> {
    return BaseResponse.error(Exception.unknown(message));
  }

  static error<T>(error: Exception): BaseResponse<T> {
    let status: number;
    switch (true) {
      case error instanceof ConflictException:
        status = 409;
        break;
      case error instanceof BadRequestException:
        status = 400;
        break;
      case error instanceof NotFoundException:
        status = 404;
        break;
      case error instanceof InternalServerException:
      case error instanceof UnknownException:
        status = 500;
        break;
      case error instanceof UnauthenticatedException:
        status = 401;
        break;
      case error instanceof UnauthorizedException:
        status = 403;
        break;
      default:
        status = 500;
    }
    return new BaseResponse<T>(status, null, error);
  }
}
