import { BaseState } from "../../../types/base-state.type";
import { CurrencyDto } from "./currency-dto.type";
import { CurrencyRateDto } from "./currency-rate-dto.type";

export interface ConverterState extends BaseState {
  currencies: CurrencyDto[];
  targetValue: string;
  allCurrencies: CurrencyRateDto[] | null;
  hiddenCurrencies: CurrencyRateDto[];
  notification: string;
  pending: {
    allCurrencies: boolean;
    currencies: boolean;
  };
  errors: {
    allCurrencies: string | null;
    currencies: string | null;
  };
}
