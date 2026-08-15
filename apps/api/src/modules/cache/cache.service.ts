import { Injectable } from '@nestjs/common';
import { CacheRepo } from './cache.repo';

@Injectable()
export class CacheService {
  constructor(private cacheRepo: CacheRepo) {}

  async set<T>(
    key: string,
    value: T,
    // ttl 60s default
    ttl: number = 60_000,
  ) {
    await this.cacheRepo.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.cacheRepo.get<T>(key);
  }

  async del(key: string): Promise<void> {
    await this.cacheRepo.del(key);
  }

  async mdel(keys: string[]): Promise<void> {
    await this.cacheRepo.delMulti(keys);
  }

  async getOrSetOnMissed<T>(
    key: string,
    getOnMissed: () => Promise<T>,
  ): Promise<T | null> {
    return this.cacheRepo.getOrSetOnMissed(key, getOnMissed);
  }
}
