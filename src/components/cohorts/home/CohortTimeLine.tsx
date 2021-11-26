import { Box, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { HOME_PAGE_EVENTS } from 'utils/amplitude';
import useAuth from '../../../hooks/useAuth';
import { Session, Cohort } from '../../../@types/cohorts';
import { CircularLoader, SectionContainer } from './Common';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';

const CohortTimeLine = ({
  cohort,
  sessions
}: {
  cohort: Cohort;
  sessions: Session[];
  // eslint-disable-next-line arrow-body-style
}) => {
  const { user } = useAuth();
  const [header, setHeader] = useState('');
  const [activeSession, setActiveSession] = useState(0);
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    let currentSessionNumber = 0;
    let flag = true;
    let isHeaderSet = false;
    sessions?.forEach((session, index) => {
      if (moment(session.time).add(1, 'hours') > moment() && flag) {
        currentSessionNumber = index + 1;
        if (moment().add(1, 'hours') >= moment(session.time)) {
          setHeader(`🔴 Get ready, Session ${currentSessionNumber} is starting soon!`);
          isHeaderSet = true;
        } else {
          setHeader(
            `👋 Welcome back ${user?.first_name}, we hope you enjoyed Session ${
              currentSessionNumber - 1
            }!`
          );
        }

        flag = false;
      }
    });

    if (currentSessionNumber === 1 && sessions?.length) {
      if (!isHeaderSet) {
        setHeader(`👋 Hi ${user?.first_name}, welcome to the ${cohort?.code || ''} Cohort!`);
      }
    }

    if (currentSessionNumber === 0 && sessions?.length) {
      setHeader(`🎉 Congratulations, you’ve completed the ${cohort?.code || ''} cohort!`);
    }

    setActiveSession(currentSessionNumber);
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
              onTrackEvent={(eventData: string) =>
                sendAnalyticsData(
                  activeSession === 0 ? sessions.length : activeSession,
                  HOME_PAGE_EVENTS.cohort_timeline,
                  eventData
                )
              }
              cohortID={cohort.id}
              activeSession={activeSession === 0 ? sessions.length + 2 : activeSession}
              sessions={sessions}
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
