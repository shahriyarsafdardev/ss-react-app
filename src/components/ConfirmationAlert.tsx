import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
  <Dialog open={open} maxWidth="sm" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <Box position="absolute" top={0} right={0}>
      <IconButton onClick={() => onCancel()}>
        <Close />
      </IconButton>
    </Box>
    <DialogContent>
      <Typography>{alertText}</Typography>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" variant="contained" onClick={() => onCancel()}>
        Cancel
      </Button>
      <Button color="error" variant="contained" onClick={() => onConfirm()}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationAlert;
