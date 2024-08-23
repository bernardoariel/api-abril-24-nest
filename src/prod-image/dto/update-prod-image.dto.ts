import { PartialType } from '@nestjs/mapped-types';
import { CreateProdImageDto } from './create-prod-image.dto';

export class UpdateProdImageDto extends PartialType(CreateProdImageDto) {}
