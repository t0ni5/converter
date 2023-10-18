import React from "react";
import { Popover, List, ListItem, ListItemText, Button } from "@mui/material";
import {
  allCurrenciesSelector,
  currenciesSelector,
  targetValueSelector,
} from "../store/converter.selectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { calculateCurrencies } from "../store/converter.actions";
import { CurrencyRateDto } from "../types/currency-rate-dto.type";
import { CurrencyDto } from "../types/currency-dto.type";

interface ListsPopoverProps {
  handleAddCurrency: (arg: CurrencyRateDto) => void;
}

const ListsPopover: React.FC<ListsPopoverProps> = ({
  handleAddCurrency,
}: ListsPopoverProps) => {
  const dispatch = useAppDispatch();
  const allCurrencies: CurrencyRateDto[] | null = useAppSelector(
    allCurrenciesSelector,
  );
  const selectedCurrencies: CurrencyDto[] = useAppSelector(currenciesSelector);
  const targetValue: string = useAppSelector(targetValueSelector);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCurrencySelection = (selectedCurrency: CurrencyRateDto) => {
    handleAddCurrency(selectedCurrency);

    if (targetValue !== "")
      dispatch(
        calculateCurrencies({
          calculationData: selectedCurrencies.concat({
            name: selectedCurrency.name,
            value: 0,
          }),
          targetValue,
        }),
      );

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick}>Add currency</Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List style={{ maxHeight: "200px", overflow: "auto" }}>
          {allCurrencies?.map((currency) => (
            <ListItem
              key={currency.name}
              onClick={() => handleCurrencySelection(currency)}
            >
              <ListItemText primary={currency.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ListsPopover;
