import { TextField, styled } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Input = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));
