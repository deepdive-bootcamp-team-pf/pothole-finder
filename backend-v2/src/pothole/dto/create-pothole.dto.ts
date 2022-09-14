import { Equals, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PotholeSeverity } from '../pothole-severity.enum';

export class CreatePotholeDto {
  @IsOptional() description: string;
  @IsNotEmpty() lat: number;
  @IsNotEmpty() lng: number;
  @IsEnum(PotholeSeverity) severity: PotholeSeverity;
}
