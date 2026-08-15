import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { CacheService } from 'src/modules/cache/cache.service';
import { CACHE_EVICT_META_DATA_KEY } from './cache-evict.decorator';

@Injectable()
export class CacheEvictInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private cacheService: CacheService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const cacheKeysToEvict =
      this.reflector.getAllAndOverride<string[]>(CACHE_EVICT_META_DATA_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (!cacheKeysToEvict?.length) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async () => {
        await this.cacheService.mdel(cacheKeysToEvict);
      }),
    );
  }
}
