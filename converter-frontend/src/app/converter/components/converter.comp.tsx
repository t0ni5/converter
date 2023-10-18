import { Grid, IconButton, InputAdornment, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  currenciesSelector,
  errorsSelector,
  notificationSelector,
  targetValueSelector,
} from "../store/converter.selectors";
import {
  calculateCurrencies,
  getAllCurrencies,
} from "../store/converter.actions";
import {
  addCurrency,
  deleteCurrency,
  setNotification,
  setTargetValue,
} from "../store/converter.slice";
import ListsPopover from "./lists-popover.comp";
("./lists-popover.comp");
import { CurrencyDto } from "../types/currency-dto.type";
import { CurrencyRateDto } from "../types/currency-rate-dto.type";
import ClearIcon from "@mui/icons-material/Clear";
import { CurrencyBaseValues } from "../../enums/currency-base-values.enum";
import { useDebouncedCallback } from "use-debounce";
import _ from "lodash";
import { Input } from "./input.comp";
import ActionAlert from "./action-alert.comp";

interface ConverterProps {
  children?: React.ReactNode;
  index: number;
}

const Converter: React.FC<ConverterProps> = ({ index }: ConverterProps) => {
  const dispatch = useAppDispatch();

  const currencies: CurrencyDto[] = useAppSelector(currenciesSelector);
  const targetValue: string = useAppSelector(targetValueSelector);
  const errors = useAppSelector(errorsSelector);
  const notification = useAppSelector(notificationSelector);

  const [currenciesToShow, setCurrenciesToShow] =
    useState<CurrencyDto[]>(currencies);

  useEffect(() => {
    dispatch(getAllCurrencies());
  }, []);

  useEffect(() => {
    if (errors.allCurrencies) {
      dispatch(setNotification(errors.allCurrencies));
    }
    if (errors.currencies) {
      dispatch(setNotification(errors.currencies));
    }
  }, [errors]);

  useEffect(() => {
    if (targetValue === "" && currencies) {
      setCurrenciesToShow(currencies);
    }

    if (currencies && targetValue !== "") {
      const notChangedValue: CurrencyDto | undefined = currenciesToShow.find(
        (currency) => currency.name === targetValue,
      );
      const currenciesToChange: (CurrencyDto | undefined)[] = currencies.map(
        (currency) =>
          currency.name === targetValue ? notChangedValue : currency,
      );

      if (notChangedValue)
        setCurrenciesToShow(currenciesToChange as CurrencyDto[]);
    }
  }, [targetValue, currencies]);

  useEffect(() => {
    if (currencies.length > 0 && targetValue)
      dispatch(
        calculateCurrencies({
          calculationData: currencies,
          targetValue,
        }),
      );
  }, [targetValue]);

  const handleDelete = (currency: CurrencyDto) => {
    dispatch(deleteCurrency(currency));
  };

  const throttledhandleDelete = _.throttle(
    (currency) => handleDelete(currency),
    700,
    { trailing: false },
  );

  const handleAddCurrency = (currency: CurrencyRateDto) => {
    dispatch(addCurrency(currency));
  };

  const performCalculation = useDebouncedCallback(
    (updatedCurrencies: CurrencyDto[]) =>
      dispatch(
        calculateCurrencies({
          calculationData: updatedCurrencies,
          targetValue,
        }),
      ),
    300,
  );

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(setTargetValue(e.target.id));
    const changedCurrency: CurrencyDto | undefined = currenciesToShow.find(
      (currency) => currency.name === e.target.id,
    );

    const updatedCurrencies: CurrencyDto[] = currenciesToShow.map((currency) =>
      currency.name === changedCurrency!.name
        ? {
            ...currency,
            value: e.target.value === "" ? "" : parseFloat(e.target.value),
          }
        : currency,
    );

    setCurrenciesToShow(updatedCurrencies);

    performCalculation(updatedCurrencies);
  };

  return (
    <>
      <ActionAlert alertMessage={notification} />
      <Grid
        direction="column"
        role="tabpanel"
        id={`currency-tab-panel-${index}`}
        container
        gap={3}
      >
        {currenciesToShow.map((currency) => (
          <Stack
            key={currency.name}
            direction={"row"}
            marginTop={"24px"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Input
              id={currency.name}
              label={currency.name}
              variant="standard"
              value={currency.value}
              onChange={handleChange}
              type="number"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {currency.name !== CurrencyBaseValues.BYN &&
                    currency.name !== CurrencyBaseValues.RUB &&
                    currency.name !== CurrencyBaseValues.EUR &&
                    currency.name !== CurrencyBaseValues.USD ? (
                      <IconButton
                        onClick={() => throttledhandleDelete(currency)}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        ))}{" "}
        <ListsPopover handleAddCurrency={handleAddCurrency} />
      </Grid>
    </>
  );
};

export default Converter;
