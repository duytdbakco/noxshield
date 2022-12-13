import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';

interface InputProps {
  defaultValue?: unknown;
  onChange?: any;
  endAdornment: React.ReactNode;
  inputRef: any;
  id?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  id = 'searchByName',
  label = 'Tìm kiếm',
  onChange,
  endAdornment,
  inputRef,
  defaultValue,
}) => {
  return (
    <OutlinedInput
      style={{ borderRadius: '5px', backgroundColor: '#FFFF' }}
      id={id}
      label={label}
      endAdornment={endAdornment}
      onChange={onChange}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
