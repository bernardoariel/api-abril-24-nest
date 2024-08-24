import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdStock } from './entities/prod-stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdStockService {
  
  constructor(
    @InjectRepository(ProdStock)
    private prodStockRepository: Repository<ProdStock>,
  ) {}
  async findByCodProductoWithStock(codProducto: string): Promise<ProdStock[]> {
    const results = await this.prodStockRepository
    .createQueryBuilder('prodStock')
    .where('prodStock.CodProducto = :codProducto', { codProducto })
    .andWhere('prodStock.Cantidad > 0')
    .getMany();
  
  
    return results;
  }
 
}
