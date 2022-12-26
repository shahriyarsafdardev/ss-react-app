import { Box } from '@material-ui/core';
import { useEffect, useState, memo } from 'react';
import moment from 'moment';
import { Session, Cohort } from '../../../@types/cohorts';
import { CircularLoader, firstUpcomingDate, SectionContainer } from './Common';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';

const CohortTimeLine = ({
  cohort,
  sessions,
  activeStepper
}: {
  cohort: Cohort;
  sessions: Session[];
  activeStepper: number;
  // eslint-disable-next-line arrow-body-style
}) => {
  const [activeSession, setActiveSession] = useState(0);

  useEffect(() => {
    let currentSessionNumber = 0;
    let flag = true;
    sessions?.forEach((session, index) => {
      if (moment(firstUpcomingDate(session.times)).add(2, 'hours') > moment() && flag) {
        currentSessionNumber = index + 1;
        flag = false;
      }
    });

    setActiveSession(currentSessionNumber);
  }, [sessions]);

  return (
    <Box>
      <SectionContainer className="timeline">
        {sessions ? (
          <>
            <DesktopStepper
              cohortID={cohort.id}
              activeSession={activeSession === 0 ? sessions.length + 2 : activeSession + 1}
              sessions={sessions}
              activeStepper={activeStepper}
            />
            <MobileStepper cohortID={cohort.id} activeSession={activeSession} sessions={sessions} />
          </>
        ) : (
          <CircularLoader />
        )}
      </SectionContainer>
    </Box>
  );
};

export default memo(CohortTimeLine);
