import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface ICheckboxFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function CheckboxField({ name, control, label, disabled }: ICheckboxFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl disabled={!!disabled} margin="normal" component="fieldset" error={invalid}>
      <FormControlLabel
        control={<Checkbox checked={!!value} onChange={onChange} onBlur={onBlur} />}
        label={label ?? ''}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
