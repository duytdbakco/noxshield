import { Search } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import Field from 'components/Field/Field';
import Input from 'components/Field/Input';
import Label from 'components/Field/Label';
import { ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface ProducerFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProducerFilter({ filter, onSearchChange }: ProducerFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      header_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Field>
            <Label>Tìm kiếm </Label>
            <Input onChange={handleSearchChange} endAdornment={<Search />} inputRef={searchRef} />
          </Field>
        </Grid>
      </Grid>
    </Box>
  );
}
