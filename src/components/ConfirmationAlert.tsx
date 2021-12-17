import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@material-ui/core';

type ConfirmationAlertProps = {
  title: string;
  alertText: JSX.Element | string;
  open: boolean;
  onCancel: Function;
  onConfirm: Function;
};

const ConfirmationAlert = ({
  title,
  alertText,
  onCancel,
  onConfirm,
  open
}: ConfirmationAlertProps) => (
  <Dialog open={open} maxWidth="xs" fullWidth>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>
      <Typography sx={{ fontWeight: 600, textAlign: 'center' }}>{alertText}</Typography>
    </DialogContent>
    <DialogActions>
      <Button
        variant="outlined"
        onClick={() => onCancel()}
        style={{ width: '-webkit-fill-available' }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={() => onConfirm()}
        style={{ width: '-webkit-fill-available' }}
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationAlert;
