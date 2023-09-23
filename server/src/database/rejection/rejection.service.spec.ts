import { Test, TestingModule } from '@nestjs/testing';
import { RejectionService } from './rejection.service';

describe('RejectionService', () => {
  let service: RejectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionService],
    }).compile();

    service = module.get<RejectionService>(RejectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
