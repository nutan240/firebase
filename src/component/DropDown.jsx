import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function DropDown({ handleChange, DropdownName, initialValue }) {
  const addressOptions = ["Albania", "India", "Iran", "Iraq"];

  return (
    <FormControl sx={{ m: 1, minWidth: 170 }}>
      <InputLabel id="demo-simple-select-helper-label">
        Address
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        name={DropdownName}
        label="Address"
        onChange={handleChange}
        value={initialValue}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {addressOptions.map((address) => (
          <MenuItem key={address} value={address}>
            {address}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDown;
