import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ProdCostosService } from 'src/prod-costos/prod-costos.service';
import { ProdImageService } from 'src/prod-image/prod-image.service';
import { ProdStockService } from 'src/prod-stock/prod-stock.service';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    private readonly prodCostosService: ProdCostosService,
    private readonly prodImageService: ProdImageService,
    private readonly prodStockService: ProdStockService 
  ) {}
  
  
  async findProductWithPrice(term: string): Promise<any> {
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
        const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
        const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);
        
        if (!prodCostos) {
          throw new NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
        }
        
        return {
          ...prod,
          Precio: prodCostos.Precio,
          Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
          Stock: totalStock,
          Sucursales: prodStock.map(stock => ({
            CodSucursal: stock.CodSucursal,
            Cantidad: stock.Cantidad,
          }))
        };
      }));
    } else {
      const prodCostos = await this.prodCostosService.findByCodProducto(producto.CodProducto);
      const prodImagen = await this.prodImageService.findByCodProducto(producto.CodProducto);
      const prodStock = await this.prodStockService.findByCodProductoWithStock(producto.CodProducto);
      const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);
      
      if (!prodCostos) {
        throw new NotFoundException('Costos para el producto no encontrados');
      }
      
      return {
        ...producto,
        Precio: prodCostos.Precio,
        Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
        Stock: totalStock,
        Sucursales: prodStock.map(stock => ({
          CodSucursal: stock.CodSucursal,
          Cantidad: stock.Cantidad,
        }))
      };
    }
  }
  
  
  
}
