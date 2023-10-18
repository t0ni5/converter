import { CurrencyDto } from "./currency-dto.type";

export interface CalculationDto {
  calculationData: CurrencyDto[];
  targetValue: string;
}
