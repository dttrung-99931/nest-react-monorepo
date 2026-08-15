import type { RedisClientType } from '@keyv/redis';
import { Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './cache.constants';

export type CacheItem = {
  key: string;
  value: unknown;
  ttl?: number | undefined;
};

@Injectable()
export class CacheRepo {
  constructor(
    private cache: Cache,
    @Inject(REDIS_CLIENT) private redis: RedisClientType,
  ) {}

  async set<T>(
    key: string,
    value: T,
    // ttl 60s default
    ttl: number = 60_000,
  ) {
    await this.cache.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cache.get<T>(key);
    return value;
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async delMulti(keys: string[]): Promise<void> {
    await this.cache.mdel(keys);
  }

  async setMulti(items: CacheItem[]): Promise<void> {
    await this.cache.mset(items);
  }

  async setNxPx(key: string, ttl: number): Promise<boolean> {
    const res = await this.redis.set(key, '1', {
      NX: true,
      PX: ttl,
    });
    return res === 'OK';
  }

  async getOrSetOnMissed<T>(
    key: string,
    getOnMissed: () => Promise<T>,
  ): Promise<T | null> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    const value = await getOnMissed();
    await this.set(key, value);
    return value;
  }
}
