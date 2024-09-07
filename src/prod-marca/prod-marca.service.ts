import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdMarca } from './entities/prod-marca.entity';

@Injectable()
export class ProdMarcaService {
  constructor(
    @InjectRepository(ProdMarca, 'sqlserverConnection')
    private prodMarcaRepository: Repository<ProdMarca>,
  ) {}

  findAll(): Promise<ProdMarca[]> {
    return this.prodMarcaRepository.find();
  }

  findOne(CodMarca: string): Promise<ProdMarca> {
    return this.prodMarcaRepository.findOne({ where: { CodMarca } });
  }
}