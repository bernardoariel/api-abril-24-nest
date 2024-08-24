import { Controller, Get, Param } from '@nestjs/common';
import { ProdMarcaService } from './prod-marca.service';

@Controller('prod-marca')
export class ProdMarcaController {
  constructor(private readonly prodMarcaService: ProdMarcaService) {}

  @Get()
  findAll() {
    return this.prodMarcaService.findAll();
  }

  @Get(':CodMarca')
  findOne(@Param('CodMarca') CodMarca: string) {
    return this.prodMarcaService.findOne(CodMarca);
  }
}
