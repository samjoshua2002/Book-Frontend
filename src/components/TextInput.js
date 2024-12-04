import { TextField } from '@mui/material';
import React from 'react';

const TextInput = ({ label, name, value, onChange, helperText, className, type }) => {
  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      className={`text-input-field ${className}`}
      name={name}
      value={value}
      onChange={onChange}
      helperText={helperText}
      sx={{
        m: 1,
        width: '100%', 
        "& .MuiFormHelperText-root": {
          marginLeft: "10px",
        },
      }}
    />
  );
};

export default TextInput;
