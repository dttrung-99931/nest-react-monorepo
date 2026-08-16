import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { BaseResponse, Exception } from "@monorepo/types";
import { Request, Response } from "express";

export class NestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const request = httpHost.getRequest<Request>();
    const response = httpHost.getResponse<Response>();
    if (Exception.isException(exception)) {
      const errResponse = BaseResponse.error(exception);
      return response.status(errResponse.status).json(errResponse);
    }
    const unknownResponse = BaseResponse.unkonwnError(String(exception));

    /// Response only if response was not sent by another interceptor, etc
    if (!response.headersSent) {
      return response.status(unknownResponse.status).json(unknownResponse);
    }
  }
}
