import { IsEnum, IsOptional } from "class-validator";
import { PotholeSeverity } from "../pothole-severity.enum";

export class GetPotholeFilterDto {
  @IsOptional() severity: PotholeSeverity;
}