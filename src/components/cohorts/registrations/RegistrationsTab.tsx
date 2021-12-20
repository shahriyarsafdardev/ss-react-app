import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { getEnrollments } from 'redux/slices/cohort';
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
  margin: '0 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export default function RegistrationsTab() {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);

  const cohort_id = window.location.pathname.split('/')[2] || '';

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { enrollments } = cohort || [];

  useEffect(() => {
    if (cohort && !enrollments) {
      dispatch(getEnrollments(cohort_id.toString()));
    }
  }, [dispatch, cohort]);

  if (!enrollments) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Homepage">
      <Highlights enrollments={enrollments} />
      <RegistrationsContainer>
        <RegistrationsHeader
          enrollments={enrollments}
          cohort_name={cohort.name}
          cohort_intake={cohort.intake}
        />
        <RegistrationsList enrollments={enrollments.slice(0, limit)} />
        {limit !== enrollments.length && (
          <RegistrationsFooter handleClick={() => setLimit(enrollments.length)} />
        )}
      </RegistrationsContainer>
    </Page>
  );
}
