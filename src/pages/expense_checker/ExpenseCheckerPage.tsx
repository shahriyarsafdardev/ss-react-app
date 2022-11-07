import LoadingScreen from 'components/LoadingScreen';
import { Stack, Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import { LoadingContainer, Logo, PaymentRootStyle, useStyles } from './Common';
import ExpenseCheckerDetails from './ExpenseCheckerDetails';
import ExpenseCheckerForm from './ExpenseCheckerForm';
import ApprovedCompanyPage from './ApprovedCompanyPage';
import NewCompanyPage from './NewCompanyPage';

export type InvitationDetails = {
  cohort_name: string;
  cohort_host_name: string;
  lead_user_name: string;
  team_company_name: string;
  team_discount: number;
};

export default function ExpenseCheckerPage() {
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<string[]>();
  const [statusApproved, setStatusApproved] = useState(false);
  const [companyExist, setCompanyExist] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const getCompanies = async () => {
    setLoading(true);
    await axios
      .get(`companies/companies.json`)
      .then((res) => {
        setCompanies(res?.data?.companies);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleEnroll = () => {
    navigate(`/registration?cohort_id=${cohortID}`);
  };
  if (companies?.length === 0 || loading || cohortID === '') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  if (statusApproved) {
    return companyExist ? (
      <ApprovedCompanyPage handleEnroll={handleEnroll} />
    ) : (
      <NewCompanyPage handleEnroll={handleEnroll} />
    );
  }

  return (
    <PaymentRootStyle title="Sphere | Expense Approval Checker">
      {isDesktop ? (
        <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-purple.png" alt="logo" />
      ) : (
        <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      )}
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.wrapperStack}>
        <ExpenseCheckerDetails />
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${classes.paymentData} ${isDesktop && classes.purpleBackground}`}
        >
          <Box className={classes.fullWidthCenter}>
            <ExpenseCheckerForm
              companies={companies || []}
              setStatusApproved={setStatusApproved}
              setCompanyExist={setCompanyExist}
            />
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
