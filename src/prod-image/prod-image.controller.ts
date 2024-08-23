import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdImageService } from './prod-image.service';


@Controller('prod-image')
export class ProdImageController {
  constructor(private readonly prodImageService: ProdImageService) {}

  
}
