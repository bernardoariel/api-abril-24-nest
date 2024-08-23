import { Test, TestingModule } from '@nestjs/testing';
import { ProdImageController } from './prod-image.controller';
import { ProdImageService } from './prod-image.service';

describe('ProdImageController', () => {
  let controller: ProdImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdImageController],
      providers: [ProdImageService],
    }).compile();

    controller = module.get<ProdImageController>(ProdImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
