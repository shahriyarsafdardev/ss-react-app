import { useEffect, useState } from 'react';
import moment from 'moment';
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
    let activeSessionCount = 0;
    sessions?.forEach((session, index) => {
      if (moment(session.time).add(1, 'hours') < moment()) {
        activeSession = index + 1;
        activeSessionCount++;
      }
      if (activeSessionCount === 0) {
        activeSession = 0;
      }
      if (activeSessionCount === sessions?.length) {
        activeSession = sessions?.length + 1;
      }
    });

    setActiveSession(activeSession);
  }, [sessions]);

  return (
    <SectionContainer>
      <DesktopStepper
        cohortID={cohort_id}
        activeSession={activeSession === 0 ? 1 : activeSession + 2}
        sessions={sessions}
      />
      <MobileStepper cohortID={cohort_id} activeSession={activeSession} sessions={sessions} />
    </SectionContainer>
  );
};

export default CohortTimeLine;
