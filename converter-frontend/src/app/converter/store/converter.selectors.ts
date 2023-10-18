import { RootState } from "../../../store";

export const currenciesSelector = (state: RootState) =>
  state.converter.currencies;

export const targetValueSelector = (state: RootState) =>
  state.converter.targetValue;

export const allCurrenciesSelector = (state: RootState) =>
  state.converter.allCurrencies;

export const errorsSelector = (state: RootState) => state.converter.errors;

export const notificationSelector = (state: RootState) =>
  state.converter.notification;
