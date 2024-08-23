import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('Prod_Imagenes')
export class ProdImage {

    @PrimaryColumn({ type: 'int', name: 'CodProducto' })
  CodProducto: string;

  @Column()
  URL: string;

  // Otras columnas...
}