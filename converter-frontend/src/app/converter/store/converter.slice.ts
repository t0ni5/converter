import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConverterState } from "../types/converter-state.type";
import { calculateCurrencies, getAllCurrencies } from "./converter.actions";
import { CurrencyDto } from "../types/currency-dto.type";
import { CalculationDto } from "../types/calculations-dto.type";
import { CurrencyRateDto } from "../types/currency-rate-dto.type";

const initialState: ConverterState = {
  currencies: [
    {
      name: "USD",
      value: "",
    },
    {
      name: "EUR",
      value: "",
    },
    {
      name: "BYN",
      value: "",
    },
    {
      name: "RUB",
      value: "",
    },
  ],
  allCurrencies: null,
  hiddenCurrencies: [],
  targetValue: "",
  notification: "",
  pending: {
    allCurrencies: false,
    currencies: false,
  },
  errors: {
    allCurrencies: null,
    currencies: null,
  },
};

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<string>) {
      state.notification = action.payload;
    },
    setTargetValue(state, action: PayloadAction<string>) {
      state.targetValue = action.payload;
    },
    resetCurrencies(state) {
      const result = state.currencies.map((currency) => {
        return { ...currency, value: "" };
      });

      state.currencies = result;
    },
    addCurrency(state, action: PayloadAction<CurrencyRateDto>) {
      const newCurrency = {
        name: action.payload.name,
        value: "",
      };
      state.currencies = [...state.currencies, newCurrency];
      const currencyToHide = state.allCurrencies?.find(
        (currency) => currency.name === newCurrency.name,
      );

      if (currencyToHide)
        state.hiddenCurrencies = state.hiddenCurrencies.concat(currencyToHide);

      state.allCurrencies =
        state.allCurrencies?.filter(
          (currency) => currency.name !== newCurrency.name,
        ) ?? null;
    },
    deleteCurrency(state, action: PayloadAction<CurrencyDto>) {
      const updatedCurrencies = state.currencies.filter(
        (currency) => currency.name !== action.payload.name,
      );

      state.currencies = updatedCurrencies;
      const currencyToRetrieve = state.hiddenCurrencies.find(
        (currency) => currency.name === action.payload.name,
      );

      if (currencyToRetrieve) state.allCurrencies?.push(currencyToRetrieve);
      state.allCurrencies?.sort((a, b) => a.name.localeCompare(b.name));

      const newHiddenCurrencies = state.hiddenCurrencies.filter(
        (currency) => currency.name !== currencyToRetrieve?.name,
      );

      state.hiddenCurrencies = newHiddenCurrencies;
    },
  },

  extraReducers: (builder) => {
    builder
      // ============ CALCULATE CURRENCIES ============ //
      .addCase(calculateCurrencies.pending, (state) => {
        state.pending.currencies = true;
        state.errors.currencies = null;
      })
      .addCase(
        calculateCurrencies.fulfilled,
        (state, { payload }: PayloadAction<CalculationDto>) => {
          state.pending.currencies = false;
          state.currencies = payload.calculationData;
        },
      )
      .addCase(
        calculateCurrencies.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.currencies = false;
          state.errors.currencies = action.payload;
        },
      );

    builder
      // ============ GET ALL CURRENCIES ============ //
      .addCase(getAllCurrencies.pending, (state) => {
        state.pending.allCurrencies = true;
        state.errors.allCurrencies = null;
      })
      .addCase(getAllCurrencies.fulfilled, (state, { payload }) => {
        state.pending.allCurrencies = false;
        state.allCurrencies = payload;
      })
      .addCase(
        getAllCurrencies.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.allCurrencies = false;
          state.errors.allCurrencies = action.payload;
        },
      );
  },
});

export const {
  setTargetValue,
  resetCurrencies,
  addCurrency,
  deleteCurrency,
  setNotification,
} = converterSlice.actions;
