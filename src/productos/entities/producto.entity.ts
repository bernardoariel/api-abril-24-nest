import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Productos') // Especifica el nombre de la tabla
export class Producto {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  CodProducto: string; // Llave primaria de la tabla

  @Column({ type: 'varchar', length: 255, nullable: true })
  TipoProducto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodNombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Producto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Medida: string;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Modelo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodMarca: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodRubro: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodCategoria: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Cuenta: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodBarra: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Fabricante: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodProdProv: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodProveedor: string;

  @Column({ type: 'text', nullable: true })
  DatosTecnicos: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Fotografia: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodService: string;

  @Column({ type: 'int', nullable: true })
  TiempoGarantia: number;

  @Column({ type: 'decimal', nullable: true })
  MargenMin: number;

  @Column({ type: 'decimal', nullable: true })
  MargenMax: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Unidad: string;

  @Column({ type: 'decimal', nullable: true })
  Volumen: number;

  @Column({ type: 'decimal', nullable: true })
  ValStock: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Estado: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodSucLogs: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodLogs: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodFamilia: string;

  @Column({ type: 'bit', nullable: true })
  VerSerie: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Foto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodAsigProv: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodSeccion: string;

  @Column({ type: 'decimal', nullable: true })
  Puntaje: number;

  @Column({ type: 'bit', nullable: true })
  canjePunto: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  TipoProveeduria: string;

  @Column({ type: 'bit', nullable: true })
  ValidarSerie: boolean;

  @Column({ type: 'bit', nullable: true })
  PermiteGarExt: boolean;

  @Column({ type: 'bit', nullable: true })
  Mailing: boolean;

  @Column({ type: 'bit', nullable: true })
  PlanExclusivo: boolean;

  @Column({ type: 'bit', nullable: true })
  ActivoPrecio: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PlanesAdmitidos: string;

  @Column({ type: 'bit', nullable: true })
  activaregalo: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marca: string;

  @Column({ type: 'decimal', nullable: true })
  Stock: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ImagenFile: string;

  @Column({ type: 'decimal', nullable: true })
  volumen_fisico: number;

  @Column({ type: 'decimal', nullable: true })
  peso: number;

  @Column({ type: 'int', nullable: true })
  bultos: number;

  @Column({ type: 'date', nullable: true })
  vigenciaDesde: Date;

  @Column({ type: 'date', nullable: true })
  vigenciaHasta: Date;

  @Column({ type: 'int', nullable: true })
  idPaisOrigen: number;

  @Column({ type: 'bit', nullable: true })
  Discontinuo: boolean;

  @Column({ type: 'date', nullable: true })
  Fecha_Alta: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  codSubCategoria: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodSubCategoria_Nivel1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodSubCategoria_Nivel2: string;

  @Column({ type: 'int', nullable: true })
  BultosAlCliente: number;

  @Column({ type: 'decimal', nullable: true })
  Costo1: number;

  @Column({ type: 'decimal', nullable: true })
  Flete: number;

  @Column({ type: 'decimal', nullable: true })
  Costo2: number;

  @Column({ type: 'decimal', nullable: true })
  Iva: number;

  @Column({ type: 'decimal', nullable: true })
  Utilidad: number;

  @Column({ type: 'decimal', nullable: true })
  Venta1: number;

  @Column({ type: 'decimal', nullable: true })
  Venta2: number;

  @Column({ type: 'decimal', nullable: true })
  Comision: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  NTecnico: string;

  @Column({ type: 'decimal', nullable: true })
  Descuento: number;

  @Column({ type: 'bit', nullable: true })
  Activo: boolean;

  @Column({ type: 'decimal', nullable: true })
  Dolar: number;

  @Column({ type: 'decimal', nullable: true })
  DolarCosto: number;

  @Column({ type: 'bit', nullable: true })
  ControlaSerie: boolean;

  @Column({ type: 'text', nullable: true })
  Manual: string;

  @Column({ type: 'int', nullable: true })
  Minimo: number;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFinal: Date;

  @Column({ type: 'int', nullable: true })
  unidDispon: number;

  @Column({ type: 'bit', nullable: true })
  vigCombo: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodPromocion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  UBICACION: string;

  @Column({ type: 'bit', nullable: true })
  ActivaPrecio: boolean;

  @Column({ type: 'bit', nullable: true })
  Promocion_Activa: boolean;

  @Column({ type: 'text', nullable: true })
  Promociones_Detalle: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CodProducto_rel: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  User_Edit: string;

  @Column({ type: 'int', nullable: true })
  id_material: number;

  @Column({ type: 'int', nullable: true })
  Id_Temporada: number;

  @Column({ type: 'int', nullable: true })
  id_ocasion: number;

  @Column({ type: 'int', nullable: true })
  id_linea: number;

  @Column({ type: 'int', nullable: true })
  Id_TipoBase: number;

  @Column({ type: 'int', nullable: true })
  StoreId: number;

  @Column({ type: 'bit', nullable: true })
  Publicado: boolean;

  @Column({ type: 'int', nullable: true })
  Id_Curva: number;

  @Column({ type: 'date', nullable: true })
  Fecha_Edit: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Fantasia: string;
}
