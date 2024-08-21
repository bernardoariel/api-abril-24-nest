import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}
  
  async findAll() {
    // Retorna todos los productos
    return 'tarda una banda'
    // return this.productosRepository.find();
  }
  
  async findTop10(): Promise<Producto[]> {
    // Retorna los primeros 10 productos
    return this.productosRepository.find({ take: 10 });
  }

  findOne(id: number): Promise<Producto> {
    return this.productosRepository.findOne({ where: { CodProducto: id.toString() } });
  }

  async search(queryParams: any): Promise<Producto[]> {
    const queryBuilder = this.productosRepository.createQueryBuilder('producto');

    // http://localhost:3000/productos/search?CodProducto=100001 
    if (queryParams.CodProducto) {
      queryBuilder.andWhere('producto.CodProducto = :CodProducto', { CodProducto: queryParams.CodProducto });
    }
    // http://localhost:3000/productos/search?Producto=silla
    if (queryParams.Producto) {
      queryBuilder.andWhere('producto.Producto LIKE :Producto', { Producto: `%${queryParams.Producto}%` });
    }

    const productos = await queryBuilder.getMany();

    return productos;
  }
}
