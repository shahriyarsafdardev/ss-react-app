import { Stack, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function CardDetails() {
  const classes = useStyles();

  return (
    <>
      <Stack className={classes.cardDetailsBox} spacing={1} justifyContent="center">
        <Typography sx={{ paddingBottom: '5px', borderBottom: '1px solid #E5E8EB' }}>
          Card Details
        </Typography>
        <Stack direction="row" spacing={5}>
          <Stack spacing={1}>
            <Typography>Card Number:</Typography>
            <Typography>**** **** **** 6827</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography>Expiration Date:</Typography>
            <Typography>07/24</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
