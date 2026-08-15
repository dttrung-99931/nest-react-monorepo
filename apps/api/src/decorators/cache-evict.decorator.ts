import { SetMetadata } from '@nestjs/common';

export const CACHE_EVICT_META_DATA_KEY = 'CACHE_EVICT_META_DATA_KEY';

export function CacheEvict(...cacheKeys: string[]) {
  return SetMetadata(CACHE_EVICT_META_DATA_KEY, cacheKeys);
}
