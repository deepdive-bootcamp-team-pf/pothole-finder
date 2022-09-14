import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { PotholeSeverity } from '../pothole-severity.enum';
import { CreatePotholeDto } from './create-pothole.dto';

export class UpdatePotholeDto extends PartialType(CreatePotholeDto) {
  @IsOptional() description: string;
  @IsOptional()@IsEnum(PotholeSeverity) severity: PotholeSeverity;
}
