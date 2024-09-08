import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get(':term')
  async findOne(@Param('term') term: string): Promise<any> {
    const result = await this.productosService.findProductWithPrice(term);
  
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
  
    return result;
  }
  @Get(':term/:marcas')
  async findProductsByMarca(@Param('term') term: string, @Param('marcas') marcas: string): Promise<any> {
    let result;
    
    // Si el segundo parámetro 'marcas' es "true" o "marcas", buscamos por marcas
    if (marcas === 'marcas' || marcas === 'true') {
      result = await this.productosService.findProductsByMarca(term);
    } else {
      // Si no, buscamos productos por el término (nombre o código)
      result = await this.productosService.findProductWithPrice(term);
    }

    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron productos');
    }

    return result;
  }
}
