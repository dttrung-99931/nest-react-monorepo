import { Test } from '@nestjs/testing';
import { CacheRepo } from './cache.repo';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CacheRepo,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
            delMulti: jest.fn(),
            setMulti: jest.fn(),
            setNxPx: jest.fn(),
            getOrSetOnMissed: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be define', () => {
    expect(service).toBeDefined();
  });
});
