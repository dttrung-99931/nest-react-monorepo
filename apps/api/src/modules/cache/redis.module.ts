import { Module } from '@nestjs/common';
import { REDIS_CLIENT } from './cache.constants';
import { RedisClientType, createClient } from '@keyv/redis';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (): Promise<RedisClientType> => {
        const client = createClient({
          url: 'redis://localhost:6379',
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
