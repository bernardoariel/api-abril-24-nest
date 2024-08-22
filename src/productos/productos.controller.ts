import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get('top10')
  findTop10() {
    return this.productosService.findTop10();
  }

  @Get('search')
  async search(@Query() query: any): Promise<Producto[]> {
    const productos = await this.productosService.search(query);

    if (!productos.length) {
      throw new NotFoundException('Producto no encontrado!!!');
    }

    return productos;
  }

  @Get(':term')
  async findOne(@Param('term') term: string): Promise<any> {
    const result = await this.productosService.findOneWithPrice(term);
  
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
  
    return result;
  }
}
