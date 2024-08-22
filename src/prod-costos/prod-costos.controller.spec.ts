import { Test, TestingModule } from '@nestjs/testing';
import { ProdCostosController } from './prod-costos.controller';
import { ProdCostosService } from './prod-costos.service';

describe('ProdCostosController', () => {
  let controller: ProdCostosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdCostosController],
      providers: [ProdCostosService],
    }).compile();

    controller = module.get<ProdCostosController>(ProdCostosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
