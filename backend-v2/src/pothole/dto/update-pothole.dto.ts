import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { PotholeSeverity } from '../pothole-status.enum';
import { CreatePotholeDto } from './create-pothole.dto';

export class UpdatePotholeDto extends PartialType(CreatePotholeDto) {
  @IsOptional() description: string;
  @IsEnum(PotholeSeverity) severity: PotholeSeverity;
}
