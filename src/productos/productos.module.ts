import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdCostosModule } from 'src/prod-costos/prod-costos.module';
import { ProdImageService } from 'src/prod-image/prod-image.service';
import { ProdImageModule } from 'src/prod-image/prod-image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    ProdCostosModule,
    ProdImageModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
