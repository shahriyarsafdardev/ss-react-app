import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axios from 'utils/axios';
import {
  RegistrationsHeader,
  RegistrationsFooter
} from '../../components/cohorts/registrations/Common';
import Highlights from '../../components/cohorts/registrations/Highlights';
import RegistrationsList from '../../components/cohorts/registrations/RegistrationsList';
import { RootState, useSelector } from '../../redux/store';

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
  const cohort_id = '0e71e836-c24b-40fc-af44-e466c4ec1ab8';

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const [limit, setLimit] = useState(10);
  const [enrollments, setEnrollments] = useState([]);

  const { referral_codes } = cohort || [];
  const [loading, setLoading] = useState(!referral_codes);

  useEffect(() => {
    console.log('api call >>');
    axios.get(`cohorts/enrollments_monthly_data.json`).then((res) => {
      setEnrollments(res.data.enrollments);
      setLoading(false);
    });
  }, []);

  if (!enrollments || loading) {
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
        <RegistrationsHeader enrollments={enrollments} isAdminView={true} />
        <RegistrationsList codes={referral_codes} enrollments={enrollments.slice(0, limit)} />
        {limit !== enrollments.length && (
          <RegistrationsFooter handleClick={() => setLimit(enrollments.length)} />
        )}
      </RegistrationsContainer>
    </Page>
  );
}
