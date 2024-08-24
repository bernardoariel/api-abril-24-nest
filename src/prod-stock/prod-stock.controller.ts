import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdStockService } from './prod-stock.service';

@Controller('prod-stock')
export class ProdStockController {
  constructor(private readonly prodStockService: ProdStockService) {}

  
  @Get(':codProducto')
  async findAllByCodProducto(@Param('codProducto') codProducto: string) {
    const result = await this.prodStockService.findByCodProductoWithStock(codProducto);
    return result;
  }

 

}
