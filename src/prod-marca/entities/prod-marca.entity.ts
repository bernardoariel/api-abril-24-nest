import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('Prod_Marcas')
export class ProdMarca {

    @PrimaryColumn()
    CodMarca: string;
    
    @Column()
    Marca: string;

}