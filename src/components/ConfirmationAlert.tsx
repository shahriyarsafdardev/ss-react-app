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
  alertText: string;
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
      <Button variant="outlined" onClick={() => onCancel()}>
        Cancel
      </Button>
      <Button variant="contained" onClick={() => onConfirm()}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationAlert;
