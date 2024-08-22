import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdCostosModule } from 'src/prod-costos/prod-costos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    ProdCostosModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
