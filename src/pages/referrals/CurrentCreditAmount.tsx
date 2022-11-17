import { Card, Typography, Stack, Button } from '@material-ui/core';
import { useStyles, VerticalLine } from './Common';

export default function CurrentCreditAmount() {
  const classes = useStyles();
  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '60%',
        minWidth: '60%',
        padding: '60px 55px'
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack textAlign="center" sx={{ color: '#071A33' }}>
          <Typography className={classes.font22Bold}>Current balance:</Typography>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography className={classes.greyBGHeading40} sx={{ mt: '15px' }}>
              $300
            </Typography>
            <Typography className={classes.font20Bold} sx={{ mt: '15px' }}>
              USD
            </Typography>
          </Stack>
        </Stack>
        <VerticalLine />
        <Button
          sx={{ height: '40px', width: '200px', border: '3px solid #12125C', borderRadius: '30px' }}
          variant="outlined"
        >
          Use my balance
        </Button>
      </Stack>
    </Card>
  );
}
