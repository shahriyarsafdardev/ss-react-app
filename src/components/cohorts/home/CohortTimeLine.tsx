import { Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { HOME_PAGE_EVENTS } from 'utils/amplitude';
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
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    let currentSessionNumber = 0;
    let flag = true;
    sessions?.forEach((session, index) => {
      if (moment(firstUpcomingDate(session.times)).add(1, 'hours') > moment() && flag) {
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
              onTrackEvent={(eventData: string) =>
                sendAnalyticsData(
                  activeSession === 0 ? sessions.length : activeSession,
                  HOME_PAGE_EVENTS.cohort_timeline,
                  eventData
                )
              }
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

export default CohortTimeLine;
