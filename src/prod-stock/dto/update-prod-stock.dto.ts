import { PartialType } from '@nestjs/mapped-types';
import { CreateProdStockDto } from './create-prod-stock.dto';

export class UpdateProdStockDto extends PartialType(CreateProdStockDto) {}
