import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
export const CommonButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#6CBDDB'),
  backgroundColor: '#6CBDDB',
  '&:hover': {
    backgroundColor: '#367FA9',
  },
}));
