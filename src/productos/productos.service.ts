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
    @InjectRepository(Producto,'sqlserverConnection')
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

    // Manejo de producto cuando es un array (más de un producto encontrado)
    if (Array.isArray(producto)) {
        const productosConStock = [];

        for (const prod of producto) {
            const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
            const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);

            if (totalStock > 0) {
                const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
                const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);

                if (!prodCostos) {
                    throw new NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
                }

                productosConStock.push({
                    ...prod,
                    Precio: prodCostos.Precio,
                    Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
                    Stock: totalStock,
                    Sucursales: prodStock.map(stock => ({
                        CodSucursal: stock.CodSucursal,
                        Cantidad: stock.Cantidad,
                    })),
                });
            }
        }

        if (productosConStock.length === 0) {
            throw new NotFoundException('Ningún producto con stock disponible fue encontrado');
        }

        return productosConStock;
    } else {
        // Manejo de producto único
        const prodStock = await this.prodStockService.findByCodProductoWithStock(producto.CodProducto);
        const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);

        if (totalStock === 0) {
            throw new NotFoundException('El producto no tiene stock disponible');
        }

        const prodCostos = await this.prodCostosService.findByCodProducto(producto.CodProducto);
        const prodImagen = await this.prodImageService.findByCodProducto(producto.CodProducto);

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
            })),
        };
    }
}

  
  
}
