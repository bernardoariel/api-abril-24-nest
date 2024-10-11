import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaPagoPlanesService } from './forma-pago-planes.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('FormaPago-Planes')
@Controller('forma-pago-planes')
export class FormaPagoPlanesController {
  constructor(private readonly formaPagoPlanesService: FormaPagoPlanesService) {}

 @Get()
 async findAll() {
  console.log('findall')
    return await this.formaPagoPlanesService.findAll();
  }
}
