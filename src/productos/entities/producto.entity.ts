import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Productos')
export class Producto {
 
  @PrimaryColumn({ type: 'varchar', length: 255 })
  CodProducto: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  Producto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Medida: string;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @Column({ type: 'decimal', nullable: true })
  Stock: number;

}
