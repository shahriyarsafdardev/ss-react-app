import { useDispatch } from 'redux/store';
import { addCredit } from 'redux/slices/businessCredit';
import axios from 'utils/axios';
import {
  Grid,
  Card,
  Box,
  Button,
  Stack,
  InputLabel,
  MenuItem,
  ListItemText,
  Typography,
  FormControl,
  Select as MaterialSelect
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState, memo } from 'react';
import StripeCredits from 'pages/StripeCredits';

function TopupForm({ accountID, setModal }: { accountID?: string; setModal: Function }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const Credit_Topup_Options = ['5000', '10000', '20000'];
  const [step, setStep] = useState(0);
  const [credits, setCredits] = useState(Number(Credit_Topup_Options[0]));
  const [clientSecret, setClientSecret] = useState('');

  const handleNextStep = () => {
    axios
      .post(`/credit_accounts/${accountID}/payment_intent.json`, { amount: credits })
      .then((response) => {
        setClientSecret(response.data.client_secret);
        setStep(1);
      });
  };

  const handleSubmit = async () => {
    if (accountID) {
      await axios
        .post(`/credit_accounts/${accountID}/add_credit.json`, {
          amount: credits
        })
        .then((res) => {
          dispatch(addCredit(res.data));
          enqueueSnackbar('Card Details submitted', { variant: 'success' });
          setModal(false);
        })
        .catch((error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    } else {
      enqueueSnackbar('Invalid user credentials', { variant: 'error' });
    }
  };

  return (
    <Card sx={{ p: 3, height: 1, overflow: 'visible', background: 'white' }}>
      {step === 0 && (
        <>
          <Box sx={{ mb: 5 }}>
            <Typography data-testid="add-credits-header" variant="h6" align="center" paragraph>
              Add Credits to Keep Saving
            </Typography>
          </Box>
          <Stack
            width={{ md: '40%', xs: '90%' }}
            spacing={2}
            sx={{ m: 'auto' }}
            justifyContent="center"
          >
            <FormControl fullWidth>
              <InputLabel data-testid="top-up-label">Top Up Amount</InputLabel>
              <MaterialSelect
                fullWidth
                label="Company Industries"
                onChange={(e) => setCredits(Number(e.target.value))}
                defaultValue={Credit_Topup_Options[0]}
              >
                {Credit_Topup_Options?.map((value: string) => (
                  <MenuItem key={value} value={value}>
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </MaterialSelect>
            </FormControl>
            <Button
              data-testid="add-credits-button"
              disabled={!(credits > 0)}
              onClick={() => handleNextStep()}
              variant="contained"
            >
              Add Credits
            </Button>
          </Stack>
        </>
      )}
      {step === 1 && (
        <>
          <Box sx={{ mb: 5 }}>
            <Typography data-testid="charge-header" variant="h4" align="center" paragraph>
              You will be charged USD ${credits} for {credits} Credits
            </Typography>
          </Box>

          <Stack
            alignContent="center"
            justifyContent="center"
            width={{ xs: '100%', md: '80%' }}
            alignItems="center"
            sx={{ m: 'auto' }}
          >
            <Grid container spacing={1}>
              <Grid item sx={{ m: 'auto', width: '100%' }}>
                <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <StripeCredits
                      clientSecret={clientSecret}
                      onSuccess={() => {
                        handleSubmit();
                      }}
                      onBack={() => setStep(0)}
                    />
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </>
      )}
    </Card>
  );
}

export default memo(TopupForm);
