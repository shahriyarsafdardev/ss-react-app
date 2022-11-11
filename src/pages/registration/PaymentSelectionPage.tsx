import { Stack, Typography, Avatar, useTheme, useMediaQuery } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosV2 from 'utils/axiosV2';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { setSegmentUserProperties, trackEvent } from 'utils/eventTracking';
import { LoadingContainer, Logo, useStyles } from './Common';
import {
  IndividualMembershipPaymentDetails,
  OneTimePaymentDetails,
  TeamMembershipPaymentDetails
} from './PaymentOptionDetails';

export default function PaymentSelectionPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [company, setCompany] = useState<any>({});
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const enrollmentID = url.get('enrollment_id') || '';
  const [loading, setLoading] = useState(false);
  const [cohort, setCohort] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    if (enrollmentID && cohortID) {
      axiosV2
        .get(`enrollments/${enrollmentID}/details.json`)
        .then((res) => {
          setCohort({ ...res?.data?.cohort });
          setCompany({ ...res?.data?.company });
          setLoading(false);
          setSegmentUserProperties(res?.data?.user);
          sendAnalyticsData('Cohort Registration - Payment Choice - Page Loaded', {});
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  }, []);

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    trackEvent(cohort, eventName, eventData);
  };

  if (loading || !cohortID || !enrollmentID) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page
      width="100%"
      height={`${isDesktop && '100vh'}`}
      title="Sphere Payment"
      className={classes.purpleBackground}
    >
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
        <Stack
          className={classes.wrapperStack}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          padding={{ xs: '10px', md: '50px', lg: '112px' }}
          paddingBottom="80px !important"
        >
          {company?.logo_url && (
            <Avatar
              src={company?.logo_url}
              alt={company?.name}
              className={classes.paymentSelectionAvatar}
            />
          )}
          <Typography
            className={`${classes.heading} ${classes.whiteFont}`}
            sx={{ ...(!isDesktop && !company?.logo_url && { marginTop: '80px !important' }) }}
          >
            Pay now to secure your seat
          </Typography>
          <Typography
            textAlign="center"
            className={classes.whiteFont}
            width={{ xs: '100%', md: '80%', lg: '65%' }}
          >
            {company?.name
              ? `${company?.name} has already approved Sphere courses as an L&D expense for teams and
          individuals at ${company?.name}. We provide an invoice for expense purposes. You can get a
          full refund up to 72 hours before the date of the first session.`
              : 'We provide an invoice for expense purposes. You can get a full refund up to 72 hours before the date of the first session.'}
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            spacing={3}
            justifyContent="space-around"
            alignItems={`${!isDesktop && 'center'}`}
            marginTop={`${isDesktop && '50px'}`}
          >
            <OneTimePaymentDetails
              cohortID={cohortID}
              hostName={cohort?.host_full_names}
              price={cohort?.price}
              enrollmentID={enrollmentID}
            />
            <IndividualMembershipPaymentDetails
              cohortID={cohortID}
              hostName={cohort?.host_full_names}
              price={cohort?.price}
              enrollmentID={enrollmentID}
            />
            <TeamMembershipPaymentDetails
              cohortID={cohortID}
              hostName={cohort?.host_full_names}
              price={cohort?.price}
              enrollmentID={enrollmentID}
            />
          </Stack>
        </Stack>
      </AnalyticsContext.Provider>
    </Page>
  );
}
