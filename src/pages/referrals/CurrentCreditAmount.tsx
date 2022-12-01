import { Card, Typography, Stack, Button } from '@material-ui/core';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useContext } from 'react';
import { RootState, useSelector } from 'redux/store';
import { useStyles, VerticalLine } from './Common';

export default function CurrentCreditAmount() {
  const { credit_balance } = useSelector((state: RootState) => state.referral.referral);
  const classes = useStyles();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const handleUseBalance = () => {
    sendAnalyticsData('Balance Page - "Use My Balance" button clicked');
    window.open('https://www.getsphere.com/functions/data-and-ml', '_blank');
  };

  return (
    <Card
      sx={{
        textAlign: 'center',
        width: { xs: '100%', md: '60%' },
        minWidth: '60%',
        padding: '60px 55px',
        boxShadow: 'none',
        border: 'solid 1px rgba(145, 158, 171, 0.5)'
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack textAlign="center" sx={{ color: '#071A33' }}>
          <Typography sx={{ textAlign: 'center' }} className={classes.font22Bold}>
            Current balance:
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography className={classes.greyBGHeading40} sx={{ mt: '15px' }}>
              ${credit_balance}
            </Typography>
            <Typography className={classes.font20Bold} sx={{ mt: '15px' }}>
              USD
            </Typography>
          </Stack>
        </Stack>
        <VerticalLine />
        <Button
          sx={{
            height: '40px',
            width: '200px',
            border: '2px solid #12125C',
            borderRadius: '30px',
            mt: { xs: '15px', md: 0 }
          }}
          variant="outlined"
          onClick={() => handleUseBalance()}
        >
          Use my balance
        </Button>
      </Stack>
    </Card>
  );
}
