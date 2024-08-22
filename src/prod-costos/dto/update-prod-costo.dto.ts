import { PartialType } from '@nestjs/mapped-types';
import { CreateProdCostoDto } from './create-prod-costo.dto';

export class UpdateProdCostoDto extends PartialType(CreateProdCostoDto) {}
