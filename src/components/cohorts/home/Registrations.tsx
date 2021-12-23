import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { Cohort } from '../../../@types/cohorts';
import { CircularLoader, SectionContainer } from './Common';
import RegistrationsList from '../registrations/RegistrationsList';
import { RegistrationsFooter } from '../registrations/Common';
import { useDispatch } from '../../../redux/store';
import { getEnrollments } from '../../../redux/slices/cohort';

const StyledRegistrationsContainer = styled(Box)(() => ({
  height: '405px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-thumb': { borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, .3)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const Registrations = ({ cohort }: { cohort: Cohort }) => {
  const { enrollments } = cohort || [];
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();
  const newEnrollments = enrollments?.filter(
    (enrollment) => enrollment.status === 'Application Received'
  );
  useEffect(() => {
    if (cohort && !enrollments) {
      dispatch(getEnrollments(cohort.id));
    }
  }, [cohort]);

  return (
    <SectionContainer className="card-2" data-testid="to-do-card">
      {navigate && <Navigate to={`/cohorts/${cohort.id}/registrations`} />}

      {cohort && enrollments ? (
        <>
          <Box
            data-testid="to-do-header"
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}
          >
            <Box>
              <p style={{ fontSize: '18px', fontWeight: 700 }}>
                👋 {newEnrollments.length} New Registrations!
              </p>
              <p style={{ fontSize: '14px' }}>Make sure you accept or reject them all</p>
            </Box>
          </Box>
          <StyledRegistrationsContainer>
            <RegistrationsList page="Home" enrollments={newEnrollments} />
            <RegistrationsFooter color="#4d4dcd" handleClick={() => setNavigate(true)} />
          </StyledRegistrationsContainer>
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default Registrations;
