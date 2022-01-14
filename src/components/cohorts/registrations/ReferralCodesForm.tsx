import { useEffect, useState } from 'react';
// material
import { Box, Button, Card, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

// hooks
import { styled } from '@material-ui/core/styles';
import { ReferralCode } from '../../../@types/cohorts';
import { ReferralCodeRow } from './Common';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function ReferralCodesForm({
  codes,
  onSubmit
}: {
  codes: ReferralCode[];
  onSubmit: Function;
}) {
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>(codes);
  const [loading, setLoading] = useState(false);

  const addNewCode = () => {
    const newCode = {
      id: uuidv4().toString(),
      code: '',
      referrer_benefit: '',
      referee_benefit: ''
    };
    setReferralCodes([...referralCodes, newCode]);
  };
  const updateCode = (index: number, code: ReferralCode) => {
    const updatedCodes = [...referralCodes];
    updatedCodes[index] = code;
    setReferralCodes(updatedCodes);
  };

  return (
    <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
      <Stack width="100%" height="100%" minHeight="150px">
        {referralCodes.length > 0 && <h3 style={{ marginBottom: '0.5rem' }}>Referral Codes</h3>}
        <Stack width="100%" direction="column" alignItems="center" spacing={1}>
          {referralCodes.map((code, i) => (
            <ReferralCodeRow
              key={code.id}
              onChange={(newCode: ReferralCode) => updateCode(i, newCode)}
              code={code}
            />
          ))}
          <Button
            sx={{ width: 'fit-content' }}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={() => addNewCode()}
          >
            Add New Referral Code
          </Button>
        </Stack>
        {referralCodes.length > 0 && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <StyledLoadingButton
              onClick={() => {
                setLoading(true);
                onSubmit(referralCodes);
              }}
              variant="contained"
              loading={loading}
              id="btn-submit"
            >
              Save Changes
            </StyledLoadingButton>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
