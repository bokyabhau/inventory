import { Test, TestingModule } from '@nestjs/testing';
import { RejectionController } from './rejection.controller';

describe('RejectionController', () => {
  let controller: RejectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionController],
    }).compile();

    controller = module.get<RejectionController>(RejectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
