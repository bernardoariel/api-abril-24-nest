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
  async findOne(@Param('term') term: string): Promise<Producto | Producto[]> {
    // http://localhost:3000/productos/1
    if (!isNaN(+term)) {
      const producto = await this.productosService.findOne(+term);
      if (!producto) {
        throw new NotFoundException('Producto no encontrado por ID');
      }
      return producto;
    } 
    
    // http://localhost:3000/productos/heladera
    const productos = await this.productosService.search({ Producto: term.trim() });
    if (!productos.length) {
      throw new NotFoundException('Producto no encontrado con el término especificado');
    }
    return productos;

  }
}
