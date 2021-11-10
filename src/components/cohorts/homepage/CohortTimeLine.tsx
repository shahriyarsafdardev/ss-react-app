import { useEffect, useState } from 'react';
import moment from 'moment';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';

import { SectionContainer } from './Common';
import DesktopStepper from './DesktopStepper';

const containerStyle = {
  width: '100%',
  height: '200px',
  display: 'flex',
  alignItems: 'center'
};

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
    <SectionContainer style={containerStyle}>
      <DesktopStepper activeSession={activeSession} sessions={sessions} />
    </SectionContainer>
  );
};

export default CohortTimeLine;
