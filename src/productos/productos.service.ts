import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ProdCostosService } from 'src/prod-costos/prod-costos.service';
import { ProdImageService } from 'src/prod-image/prod-image.service';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    private readonly prodCostosService: ProdCostosService,
    private readonly prodImageService: ProdImageService
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
    
    if (queryParams.Producto) {
      queryBuilder.andWhere('producto.Producto LIKE :Producto', { Producto: `%${queryParams.Producto}%` });
    }

    const productos = await queryBuilder.getMany();

    return productos;
  }
  
  async findOneWithPrice(term: string): Promise<any> {
    let producto: Producto | Producto[];
  
    if (!isNaN(+term)) {
      producto = await this.productosRepository.findOne({ where: { CodProducto: term } });
    } else {
      producto = await this.productosRepository
        .createQueryBuilder('producto')
        .where('producto.Producto LIKE :Producto', { Producto: `%${term.trim()}%` })
        .getMany();
    }
  
    if (!producto || (Array.isArray(producto) && producto.length === 0)) {
      throw new NotFoundException('Producto no encontrado');
    }
  
    if (Array.isArray(producto)) {
      return Promise.all(producto.map(async (prod) => {
        const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
        const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);
        if (!prodCostos) {
          throw new NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
        }
        return {
          ...prod,
          Precio: prodCostos.Precio,
          Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
        };
      }));
    } else {
      const prodCostos = await this.prodCostosService.findByCodProducto(producto.CodProducto);
      const prodImagen = await this.prodImageService.findByCodProducto(producto.CodProducto);
      if (!prodCostos) {
        throw new NotFoundException('Costos para el producto no encontrados');
      }
      return {
        ...producto,
        Precio: prodCostos.Precio,
        Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
      };
    }
  }
  
  
  
}
