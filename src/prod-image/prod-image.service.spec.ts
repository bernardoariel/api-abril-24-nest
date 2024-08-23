import { Test, TestingModule } from '@nestjs/testing';
import { ProdImageService } from './prod-image.service';

describe('ProdImageService', () => {
  let service: ProdImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdImageService],
    }).compile();

    service = module.get<ProdImageService>(ProdImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
