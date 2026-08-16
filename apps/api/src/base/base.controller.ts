import { ZodError } from '@monorepo/common';
import { BaseResponse, Exception } from '@monorepo/types';

export abstract class BaseController {
  /**
   * Execute @action and return the result in form of BaseResponse
   *
   * Return BaseResponse.success(result) if @action successful
   * Otherwise, return error BaseResponse
   */
  async handleRequest<T>(action: () => Promise<T>): Promise<BaseResponse<T>> {
    try {
      const result: T = await action();
      return BaseResponse.success(result);
    } catch (e) {
      if (Exception.isException(e)) {
        return BaseResponse.error(e);
      }
      if (e instanceof ZodError) {
        return BaseResponse.badRequest(e.message);
      }
      return BaseResponse.unkonwnError(String(e));
    }
  }
}
