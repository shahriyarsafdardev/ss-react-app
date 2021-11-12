import { useEffect, useState } from 'react';
import moment from 'moment';
import { CircularProgress, Box } from '@material-ui/core';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';
import { SectionContainer } from './Common';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';

const CohortTimeLine = () => {
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const [activeSession, setActiveSession] = useState(0);

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
        flag = false;
      }
    });

    setActiveSession(activeSession);
  }, [sessions]);

  return (
    <SectionContainer>
      {sessions ? (
        <>
          <DesktopStepper
            cohortID={cohort_id}
            activeSession={activeSession === 0 ? sessions.length + 2 : activeSession + 1}
            sessions={sessions}
          />
          <MobileStepper cohortID={cohort_id} activeSession={activeSession} sessions={sessions} />
        </>
      ) : (
        <Box sx={{ textAlign: 'center', margin: 'auto' }}>
          <CircularProgress />
        </Box>
      )}
    </SectionContainer>
  );
};

export default CohortTimeLine;
