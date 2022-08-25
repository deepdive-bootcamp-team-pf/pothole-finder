import { IsEnum, IsOptional } from "class-validator";
import { PotholeSeverity } from "../pothole-status.enum";

export class GetPotholeFilterDto {
  @IsOptional() @IsEnum(PotholeSeverity) severity: PotholeSeverity;
}