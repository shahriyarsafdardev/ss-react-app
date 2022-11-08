import LoadingScreen from 'components/LoadingScreen';
import { Stack, Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import { trackEvent } from 'utils/eventTracking';
import { LoadingContainer, Logo, PaymentRootStyle, useStyles } from './Common';
import ExpenseCheckerDetails from './ExpenseCheckerDetails';
import ExpenseCheckerForm from './ExpenseCheckerForm';
import ApprovedCompanyPage from './ApprovedCompanyPage';
import NewCompanyPage from './NewCompanyPage';

export type Company = {
  name: string;
  logo_url: string;
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
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    name: '',
    logo_url: ''
  });
  const [cohort, setCohort] = useState<any>();

  const getCompanies = async () => {
    setLoading(true);
    await axios
      .get(`companies/companies.json`, {
        params: {
          cohort_id: cohortID
        }
      })
      .then((res) => {
        setCompanies(res?.data?.companies);
        setCohort(res?.data?.cohort);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    cohort &&
      window.analytics?.ready &&
      window.analytics?.ready(() => {
        window.analytics?.identify(window.analytics?.user().anonymousId(), {});
        trackEvent(cohort, 'L&D Approval Checker - Company Selection - Page Opened');
      });
  }, [cohort, window.analytics?.ready]);

  const handleEnroll = () => {
    const eventName = companyExist
      ? 'L&D Approval Checker - Approved Company - "Enroll" Selected'
      : 'L&D Approval Checker - New Company - "Enroll" Selected';
    trackEvent(cohort, eventName, {
      Company: selectedCompany?.name
    });
    navigate(`/registration?cohort_id=${cohortID}`);
  };
  if (companies?.length === 0 || loading || cohortID === '' || !cohort) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  if (statusApproved && selectedCompany?.name !== '') {
    return companyExist ? (
      <ApprovedCompanyPage handleEnroll={handleEnroll} company={selectedCompany} cohort={cohort} />
    ) : (
      <NewCompanyPage handleEnroll={handleEnroll} company={selectedCompany} cohort={cohort} />
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
              setSelectedCompany={setSelectedCompany}
              cohort={cohort}
            />
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
