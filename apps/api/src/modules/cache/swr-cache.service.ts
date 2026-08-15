import { Injectable } from '@nestjs/common';
import { CacheRepo } from './cache.repo';

@Injectable()
export class SwrCacheService {
  constructor(private cache: CacheRepo) {}
  private revalidatingPromisesMap = new Map<string, Promise<unknown>>();
  static NX_PX_LOCK_MILIS = 10_000;
  static WAIT_FOR_CACHE_SET_DURATION = 5000; //milis
  static WAIT_FOR_CACHE_SET_INTERVAL = 100; //milis

  private keyBuilder = {
    stale(key: string): string {
      return `${key}:stale`;
    },

    lockInvalidate(key: string): string {
      return `lock:invalidate:${key}`;
    },

    lockGet(key: string): string {
      return `lock:get:${key}`;
    },
  };

  async getOrSetOnMissed<T>(
    key: string,
    getOnMissed: () => Promise<T>,
    // ms
    freshTtl = 60_000,
    stealTtl = 120_000,
  ): Promise<T | null> {
    const freshValue = await this.cache.get<T>(key);
    if (freshValue) {
      return freshValue;
    }

    const staleValue = await this.cache.get<T>(this.keyBuilder.stale(key));
    if (staleValue) {
      this.revalidateWithLock(key, getOnMissed, freshTtl, stealTtl);
      return staleValue;
    }

    return this.getWithLock(key, getOnMissed, freshTtl, stealTtl);
  }

  async getWithLock<T>(
    key: string,
    getOnMissed: () => Promise<T>,
    freshTtl: number,
    stealTtl: number,
  ): Promise<T> {
    return await this.singleExecute(this.keyBuilder.lockGet(key), async () => {
      let lockAcquired = false;
      try {
        lockAcquired = await this.cache.setNxPx(
          this.keyBuilder.lockGet(key),
          SwrCacheService.NX_PX_LOCK_MILIS,
        );
      } catch (e) {
        console.error('Error acquiring lock in getWithLock', e);
      }

      if (lockAcquired) {
        try {
          const refreshValue = await getOnMissed();
          this.set(key, refreshValue, freshTtl, stealTtl);
          return refreshValue;
        } catch (e) {
          console.error('getWithLock getOnMissed & set cache error', e);
        }
      } else {
        return this.waitForCacheSetOrGet(key, getOnMissed);
      }
    });
  }

  async waitForCacheSetOrGet<T>(
    key: string,
    getOnMissed: () => Promise<T>,
  ): Promise<T> {
    let duration = 0;
    while (duration <= SwrCacheService.WAIT_FOR_CACHE_SET_DURATION) {
      try {
        const value = await this.cache.get<T>(key);
        if (value) {
          return value;
        }
      } catch (e) {
        console.error(
          'Error getting value from cache in waitForCacheSetOrGet',
          e,
        );
      }
      // Sleep
      await new Promise(async (resolve) =>
        setTimeout(resolve, SwrCacheService.WAIT_FOR_CACHE_SET_INTERVAL),
      );
    }
    // If cache not set after SwrCacheService.WAIT_FOR_CACHE_SET_DURATION
    // getOnMissed directly
    return await getOnMissed();
  }

  async set<T>(key: string, value: T, freshTtl: number, stealTtl: number) {
    await this.cache.setMulti([
      {
        key: key,
        value: value,
        ttl: freshTtl,
      },
      {
        key: this.keyBuilder.stale(key),
        value: value,
        ttl: stealTtl,
      },
    ]);
  }

  async revalidateWithLock<T>(
    key: string,
    getOnMissed: () => Promise<T>,
    freshTtl: number,
    stealTtl: number,
  ): Promise<void> {
    await this.singleExecute(this.keyBuilder.lockInvalidate(key), async () => {
      let lockAcquired = false;
      try {
        lockAcquired = await this.cache.setNxPx(
          this.keyBuilder.lockInvalidate(key),
          SwrCacheService.NX_PX_LOCK_MILIS,
        );
      } catch (e) {
        console.error('Error acquiring lock in revalidateWithLock', e);
      }

      if (lockAcquired) {
        try {
          const refreshValue = await getOnMissed();
          await this.set(key, refreshValue, freshTtl, stealTtl);
        } catch (e) {
          console.error('revalidateWithLock getOnMissed & set cache  error', e);
        }
      }
    });
  }

  async singleExecute<T>(
    key: string,
    action: () => Promise<unknown>,
  ): Promise<T> {
    let promise = this.revalidatingPromisesMap[key];
    if (!promise) {
      promise = action();
      this.revalidatingPromisesMap.set(key, promise);
      promise.finally(() => {
        this.revalidatingPromisesMap.delete(key);
      });
    }
    return promise;
  }
}
