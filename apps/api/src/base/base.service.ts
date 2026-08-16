import { Prisma, PrismaClientKnownRequestError } from '@monorepo/database';
import { Exception, prismaErrorCodes } from '@monorepo/types';

export class BaseService {
  async handleError<T>(action: () => Promise<T>): Promise<T> {
    try {
      const result: T = await action();
      return result;
    } catch (e: any) {
      if (e instanceof PrismaClientKnownRequestError) {
        // @FIXME: this cannot handle not found error when
        // when get location by id
        switch (e.code) {
          case prismaErrorCodes.notFound:
            throw Exception.notFound({
              id: null,
              type: e.name,
            });
          default:
            throw Exception.unknown(e.message);
        }
      }
      throw Exception.unknown(e);
    }
  }
}
