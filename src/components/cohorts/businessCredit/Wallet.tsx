import { Box, Typography, Card, Button } from '@material-ui/core';
import { useStyles } from './styles';

const Wallet = ({
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
      <Typography variant="h5">{accountName && `${accountName}'s`} ScholarSite Wallet</Typography>
      <Box display="flex" justifyContent="space-between" marginTop="10px">
        <Box display="flex" alignItems="baseline">
          <Typography variant="h3" color="#4D4DCD">
            {currentBalance}
          </Typography>
          <Typography variant="body1" style={{ marginLeft: '5px' }}>
            Credits
          </Typography>
        </Box>
        <Box>
          <Button onClick={() => setModal(true)} variant="contained">
            Top Up Credits
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default Wallet;
