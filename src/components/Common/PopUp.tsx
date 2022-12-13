import CloseIcon from '@mui/icons-material/Close';
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  dialogWrapper: {
    position: 'absolute',
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  closeBtn: {
    position: 'absolute',
  },
}));

interface PopUpProps {
  title: string;
  subtitle?: string;
  children: any;
  openPopUp: boolean;
  onClose: () => void;
  fullWith?: boolean;
  maxWidth?: Breakpoint;
  fullScreen?: boolean;
}

export default function PopUp({
  title,
  subtitle,
  children,
  openPopUp,
  onClose,
  fullWith,
  maxWidth,
  fullScreen,
}: PopUpProps) {
  const classes = useStyles();

  return (
    <Dialog
      open={openPopUp}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth={fullWith}
      maxWidth={maxWidth}
      fullScreen={fullScreen}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {subtitle}
          </Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
