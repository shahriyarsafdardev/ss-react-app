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
import { AdminContainer, LoadingContainer } from './Common';

export default function RegistrationsTab() {
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const enrollments = useSelector((state: RootState) => state.adminRegistrations.enrollments);
  const cohortCodes = useSelector((state: RootState) => state.adminRegistrations.cohort_codes);
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
      <AdminContainer>
        <RegistrationsHeader enrollments={enrollments} isAdminView={true} />
        <RegistrationsList
          codes={cohortCodes}
          enrollments={enrollments.slice(0, limit)}
          isAdminView={true}
        />
        {limit !== enrollments.length && (
          <RegistrationsFooter handleClick={() => setLimit(enrollments.length)} />
        )}
      </AdminContainer>
    </Page>
  );
}
