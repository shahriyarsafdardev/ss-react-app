import { memo } from 'react';
import { Box, Typography, Card, Button } from '@material-ui/core';
import { useStyles } from './styles';

const Wallet = memo(
  ({
    currentBalance,
    setModal,
    accountName
  }: {
    currentBalance: number;
    setModal: Function;
    accountName: string;
  }) => {
    const classes = useStyles();

    return (
      <Card className={classes.sectionCard}>
        <Typography data-testid="wallet-header" variant="h5">
          {accountName && `${accountName}'s`} Sphere Wallet
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop="10px">
          <Box display="flex" alignItems="baseline">
            <Typography data-testid="credit-amount" variant="h3" color="primary.main">
              {currentBalance}
            </Typography>
            <Typography data-testid="credit-label" variant="body1" style={{ marginLeft: '5px' }}>
              Credits
            </Typography>
          </Box>
          <Box>
            <Button data-testid="top-up-button" onClick={() => setModal(true)} variant="contained">
              Top Up Credits
            </Button>
          </Box>
        </Box>
      </Card>
    );
  }
);

export default Wallet;
