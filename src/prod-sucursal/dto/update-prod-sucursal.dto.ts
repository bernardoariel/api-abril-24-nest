import { PartialType } from '@nestjs/mapped-types';
import { CreateProdSucursalDto } from './create-prod-sucursal.dto';

export class UpdateProdSucursalDto extends PartialType(CreateProdSucursalDto) {}
