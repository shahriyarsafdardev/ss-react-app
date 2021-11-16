import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import useAuth from '../../../hooks/useAuth';
import { getSessions } from '../../../redux/slices/cohort';
import { CircularLoader, SectionContainer } from './Common';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';

const CohortTimeLine = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const [activeSession, setActiveSession] = useState(0);
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  useEffect(() => {
    let activeSession = 0;
    let flag = true;
    sessions?.forEach((session, index) => {
      if (moment(session.time).add(1, 'hours') > moment() && flag) {
        activeSession = index + 1;
        if (moment().add(1, 'hours') >= moment(session.time)) {
          setHeader(`🔴 Get ready, Session ${activeSession} is starting soon!`);
        } else {
          setHeader(
            `👋 Welcome back ${user?.first_name}, we hope you enjoyed Session ${activeSession - 1}!`
          );
        }

        flag = false;
      }
    });

    if (activeSession === 1 && sessions?.length) {
      setHeader(`👋 Hi ${user?.first_name}, welcome to the ${cohort?.code || ''} Cohort!`);
      activeSession = 2;
    }

    if (activeSession === 0 && sessions?.length) {
      setHeader(`🎉 Congratulations, you’ve completed the ${cohort?.code || ''} cohort!`);
    }

    setActiveSession(activeSession);
  }, [sessions]);

  return (
    <Box>
      <Typography variant="h3" style={{ marginBottom: '20px', minHeight: '48px' }}>
        {sessions && header}
      </Typography>
      <SectionContainer className="timeline">
        {sessions ? (
          <>
            <DesktopStepper
              cohortID={cohort_id}
              activeSession={activeSession === 0 ? sessions.length + 2 : activeSession}
              sessions={sessions}
            />
            <MobileStepper cohortID={cohort_id} activeSession={activeSession} sessions={sessions} />
          </>
        ) : (
          <CircularLoader />
        )}
      </SectionContainer>
    </Box>
  );
};

export default CohortTimeLine;
