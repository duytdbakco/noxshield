import ClearIcon from '@mui/icons-material/Clear';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  item: any;
  onConfirm: (item: any) => void;
  mainMessage: string;
  subMessage: string;
  ref?: any;
}

export default function CommonDialog({
  open,
  onClose,
  item,
  onConfirm,
  mainMessage,
  subMessage,
}: // ref,
CommonDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // ref={ref}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <ClearIcon sx={{ fontSize: 60 }} color="error" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" align="center">
          <Typography color="#223354" component="h1" variant="h6">
            {mainMessage}
          </Typography>{' '}
          <br />
          {subMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={() => onConfirm(item as any)} color="error" variant="contained" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
