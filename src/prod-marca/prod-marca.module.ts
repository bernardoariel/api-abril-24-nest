import { Module } from '@nestjs/common';
import { ProdMarcaService } from './prod-marca.service';
import { ProdMarcaController } from './prod-marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdMarca } from './entities/prod-marca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdMarca], 'sqlserverConnection')],
  controllers: [ProdMarcaController],
  providers: [ProdMarcaService],
  exports:[ProdMarcaService]
})
export class ProdMarcaModule {}
