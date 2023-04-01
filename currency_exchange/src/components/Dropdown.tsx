import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Currency } from "../types/Currency";

type Props = {
  label: string;
  value: string;
  onChange: any;
  options: Currency[];
};

export const Dropdown = ({ label, value, onChange, options }: Props) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            {currency.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
