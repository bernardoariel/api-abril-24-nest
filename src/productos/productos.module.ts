import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]), // Aquí se importa la entidad Producto
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
