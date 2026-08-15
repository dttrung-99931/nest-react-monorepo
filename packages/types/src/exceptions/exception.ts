import { ErrorCode } from "./error-codes";

export type ExceptionMessageType = unknown;
export abstract class Exception {
  // field just for mark this object is Exception type
  // @ts-ignore
  private readonly _isException = true;

  toJSON() {
    const { _isException, ...rest } = this;
    return rest;
  }

  constructor(
    public readonly errorCode: ErrorCode,
    public readonly message: ExceptionMessageType,
  ) {}

  static isException(ex: any): ex is Exception {
    return (
      ex && typeof ex === "object" && "_isException" in ex && ex._isException
    );
  }

  static conflict(
    message: ExceptionMessageType = "Conflict exception",
  ): Exception {
    return new ConflictException(message);
  }

  static badRequest(message: ExceptionMessageType = "Bad request"): Exception {
    return new BadRequestException(message);
  }

  static notFound(params: { type?: string; id?: any } = {}): Exception {
    return new NotFoundException(params);
  }

  static internalError(message: string = "Internal server error"): Exception {
    return new InternalServerException(message);
  }

  static unknown(
    message: ExceptionMessageType = "Unknown exception",
  ): Exception {
    return new UnknownException(message);
  }

  static unauthenticated(
    message: ExceptionMessageType = "Unauthenticated exception",
  ): Exception {
    return new UnauthenticatedException(message);
  }

  static unauthorized(
    message: ExceptionMessageType = "Unauthorized exception",
  ): Exception {
    return new UnauthorizedException(message);
  }
}

export class ConflictException extends Exception {
  constructor(message: ExceptionMessageType = "Conflict exception") {
    super(ErrorCode.CONFLICT, message);
  }
}

export class BadRequestException extends Exception {
  constructor(message: ExceptionMessageType = "Bad request") {
    super(ErrorCode.BAD_REQUEST, message);
  }
}

export class NotFoundException extends Exception {
  constructor({ type, id }: { type?: string; id?: any }) {
    var message = "";
    if (type && id) {
      message = `${type} ${id} not found`;
    } else if (id) {
      message = `Not found, id = ${id}`;
    } else {
      message = "Not found";
    }
    super(ErrorCode.NOT_FOUND, message);
  }
}

export class InternalServerException extends Exception {
  constructor(message: string = "Internal server error") {
    super(ErrorCode.INTERNAL_ERROR, message);
  }
}

export class UnknownException extends Exception {
  constructor(message: ExceptionMessageType = "Unknown exception") {
    super(ErrorCode.UNKNOWN_ERROR, message);
  }
}
export class UnauthenticatedException extends Exception {
  constructor(message: ExceptionMessageType = "Unauthenticated exception") {
    super(ErrorCode.UNAUTHENTICATED, message);
  }
}

export class UnauthorizedException extends Exception {
  constructor(
    message: ExceptionMessageType = "UnauthorizedException exception",
  ) {
    super(ErrorCode.UNAUTHENTICATED, message);
  }
}
