import FormControl from '@mui/material/FormControl';
import React from 'react';

interface FieldProps {
  children: React.ReactNode;
  className?: any;
}

const Field: React.FC<FieldProps> = ({ children, className }) => {
  return (
    <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '15px' }}>
      {children}
    </FormControl>
  );
};

export default Field;
