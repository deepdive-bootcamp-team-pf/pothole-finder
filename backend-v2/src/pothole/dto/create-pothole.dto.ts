import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { PotholeSeverity } from '../pothole-status.enum';

export class CreatePotholeDto {
  @IsOptional() description: string
  @IsNotEmpty() lat: string;
  @IsNotEmpty() lng: string;
  @IsEnum(PotholeSeverity) severity: PotholeSeverity
}
