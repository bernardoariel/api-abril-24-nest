import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';


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
}
