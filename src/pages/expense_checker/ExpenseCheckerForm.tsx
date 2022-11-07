import { FormControl, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import MUICreatableSelect from 'components/MUICreatableSelect';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import axios from 'utils/axios';

export default function ExpenseCheckerForm({
  companies,
  setStatusApproved,
  setCompanyExist
}: {
  companies: string[];
  setStatusApproved: Function;
  setCompanyExist: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const checkApprovalStatus = async () => {
    if (company === '') {
      enqueueSnackbar('No company selected!', { variant: 'error' });
      return;
    }
    setLoading(true);
    await axios
      .get(`companies/check_approval_status.json`, {
        params: {
          company
        }
      })
      .then((res) => {
        setStatusApproved(true);
        setCompanyExist(res?.data?.company_exist);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  };

  return (
    <Stack sx={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px' }} spacing={3}>
      <FormControl data-testid="company-name" fullWidth>
        <MUICreatableSelect
          options={companies}
          value={company}
          onChange={(value: any) => setCompany(value)}
          label="Company"
        />
      </FormControl>
      <LoadingButton
        loading={loading}
        variant="contained"
        sx={{ borderRadius: '30px' }}
        onClick={checkApprovalStatus}
      >
        Check Approval Status
      </LoadingButton>
    </Stack>
  );
}
