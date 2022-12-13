import { InputLabel } from '@mui/material';
import React from 'react';

interface InputLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

const Input: React.FC<InputLabelProps> = ({ htmlFor = 'searchByName', children }) => {
  return <InputLabel htmlFor={htmlFor}>{children}</InputLabel>;
};

export default Input;
