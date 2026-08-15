import { RedisClientType, createKeyv } from '@keyv/redis';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  CacheConfigurableModuleClass,
  CacheModuleOptions,
} from './cache.module-definition';
import { CacheRepo } from './cache.repo';
import { CacheService } from './cache.service';
import { SwrCacheService } from './swr-cache.service';
import { RedisModule } from './redis.module';
import { REDIS_CLIENT } from './cache.constants';

@Global()
@Module({})
export class CacheModule extends CacheConfigurableModuleClass {
  static forRoot(options: CacheModuleOptions): DynamicModule {
    const parent = super.forRoot(options);
    return {
      ...parent,
      providers: [
        ...(parent.providers ?? []),

        CacheService,
        SwrCacheService,
        CacheRepo,
      ],
      exports: [CacheService, SwrCacheService],
      imports: [
        RedisModule,
        ...(parent.imports ?? []),
        NestCacheModule.registerAsync({
          imports: [RedisModule],
          isGlobal: true,
          inject: [REDIS_CLIENT],
          useFactory: (redis: RedisClientType) => ({
            stores: [createKeyv(redis)],
            ttl: options.ttlInMilis,
          }),
        }),
      ],
    };
  }
}
