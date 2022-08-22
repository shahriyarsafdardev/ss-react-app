import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { EVENT_TYPES, trackPageViewEvent } from 'utils/amplitude';
import { getEnrollments, getReferralCodes, clearErrors } from 'redux/slices/cohort';
import { useSnackbar } from 'notistack5';
import { RegistrationsHeader, RegistrationsFooter } from './Common';
import Highlights from './Highlights';
import RegistrationsList from './RegistrationsList';
import { RootState, useDispatch, useSelector } from '../../../redux/store';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const RegistrationsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export default function RegistrationsTab() {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);

  const cohortErrors = useSelector((state: RootState) => state.cohort.errors);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (cohortErrors.length > 0) {
      cohortErrors.forEach((error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      dispatch(clearErrors());
    }
  }, [cohortErrors]);

  const cohort_id = window.location.pathname.split('/')[2] || '';

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { enrollments, referral_codes } = cohort || [];
  const [loading, setLoading] = useState(!referral_codes);
  const [analyticsSent, setAnalyticsSent] = useState(false);

  useEffect(() => {
    if (cohort && !analyticsSent) {
      trackPageViewEvent(cohort, EVENT_TYPES.registrations_tab);
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && !enrollments) {
      dispatch(getEnrollments(cohort_id.toString()));
    }
    if (cohort && !referral_codes) {
      dispatch(getReferralCodes(cohort_id.toString()));
      setLoading(false);
    }
  }, [dispatch, cohort]);

  if (!enrollments || loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="Sphere | Homepage">
      <Highlights enrollments={enrollments} />
      <RegistrationsContainer>
        <RegistrationsHeader
          codes={referral_codes}
          enrollments={enrollments}
          cohort_name={cohort.name}
          cohort_id={cohort.id}
          cohort_intake={cohort.intake}
          isAdminView={false}
        />
        <RegistrationsList codes={referral_codes} enrollments={enrollments.slice(0, limit)} />
        {limit !== enrollments.length && (
          <RegistrationsFooter handleClick={() => setLimit(enrollments.length)} />
        )}
      </RegistrationsContainer>
    </Page>
  );
}
