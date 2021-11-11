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
    sessions?.forEach((session) => {
      if (moment(session.time) > moment()) {
        activeSession = session.number;
      }
    });
    setActiveSession(activeSession);
  }, [sessions]);

  return (
    <SectionContainer>
      <DesktopStepper activeSession={activeSession} sessions={sessions} />
      <MobileStepper activeSession={activeSession} sessions={sessions} />
    </SectionContainer>
  );
};

export default CohortTimeLine;
