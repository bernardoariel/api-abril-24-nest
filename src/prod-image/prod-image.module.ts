import { Module } from '@nestjs/common';
import { ProdImageService } from './prod-image.service';
import { ProdImageController } from './prod-image.controller';
import { ProdImage } from './entities/prod-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdImage]), // Aquí registras la entidad
  ],
  providers: [ProdImageService],
  exports:[ProdImageService]
})
export class ProdImageModule {}
