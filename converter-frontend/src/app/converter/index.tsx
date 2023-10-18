import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CurrencyTabPanel from "./components/currency-tab-panel.comp";

const Converter = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box textAlign={"center"}>
      <Box
        sx={{
          display: "inline-block",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="USD converter" />
            <Tab label="Rates to USD" />
          </Tabs>
        </Box>
        <CurrencyTabPanel value={value} index={0}>
          USD converter
        </CurrencyTabPanel>
        <CurrencyTabPanel value={value} index={1}>
          USD converter
        </CurrencyTabPanel>
      </Box>
    </Box>
  );
};

export default Converter;
