import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeEnrollments } from 'redux/slices/adminRegistrations';
import {
  RegistrationsHeader,
  RegistrationsFooter
} from '../../components/cohorts/registrations/Common';
import Highlights from '../../components/cohorts/registrations/Highlights';
import RegistrationsList from '../../components/cohorts/registrations/RegistrationsList';

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
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const enrollments = useSelector((state: RootState) => state.adminRegistrations.enrollments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeEnrollments()).then((res) => setLoading(false));
  }, []);

  if (loading) {
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
        <RegistrationsList
          codes={[]}
          enrollments={enrollments.slice(0, limit)}
          isAdminView={true}
        />
        {limit !== enrollments.length && (
          <RegistrationsFooter handleClick={() => setLimit(enrollments.length)} />
        )}
      </RegistrationsContainer>
    </Page>
  );
}
