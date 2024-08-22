import { Test, TestingModule } from '@nestjs/testing';
import { ProdCostosService } from './prod-costos.service';

describe('ProdCostosService', () => {
  let service: ProdCostosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdCostosService],
    }).compile();

    service = module.get<ProdCostosService>(ProdCostosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
