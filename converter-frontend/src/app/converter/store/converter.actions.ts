import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";
import { CalculationDto } from "../types/calculations-dto.type";
import { CurrencyRateDto } from "../types/currency-rate-dto.type";

export const calculateCurrencies = createAsyncThunk<
  CalculationDto,
  CalculationDto
>("POST/calculated currencies", async (currencies, { rejectWithValue }) => {
  try {
    const response = await repository.post(`/calculations`, currencies);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getAllCurrencies = createAsyncThunk<CurrencyRateDto[]>(
  "GET/currencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/currencies`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadCurrencies = createAsyncThunk<void>(
  "GET/load currencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/curre`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
