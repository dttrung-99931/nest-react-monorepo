import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface CacheModuleOptions {
  ttlInMilis: number;
}

export const {
  ConfigurableModuleClass: CacheConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<CacheModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
