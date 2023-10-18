import React from "react";
import Converter from "./converter.comp";
import { Box } from "@mui/material";

interface CurrencyTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CurrencyTabPanel = (props: CurrencyTabPanelProps) => {
  const { value, index } = props;
  return (
    <>
      {index === value && value === 0 && <Converter index={index} />}
      {index === value && value === 1 && <Box>to usd tab</Box>}
    </>
  );
};

export default CurrencyTabPanel;
