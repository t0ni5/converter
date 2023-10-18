import { Box } from "@mui/material";
import React from "react";

interface ToUSDTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ToUSDTabPanel = (props: ToUSDTabPanelProps) => {
  return (
    <Box>
      <h1>{"To USD"}</h1>
    </Box>
  );
};

export default ToUSDTabPanel;
