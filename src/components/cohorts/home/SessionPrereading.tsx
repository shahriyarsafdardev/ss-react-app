import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { styled } from '@material-ui/core/styles';
import { HOME_PAGE_EVENTS } from 'utils/amplitude';
import { Box, Typography } from '@material-ui/core';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useLocation } from 'react-router-dom';
import { Session, SessionMaterial, Cohort } from '../../../@types/cohorts';
import axios from '../../../utils/axios';
import { CircularLoader, firstUpcomingDate, SectionContainer, zoomTimesPreview } from './Common';
import PreReadingRow from './PreReadingRow';
import CircularProgressbar from './CircularProgressBar';
import JoinZoomPrompt from '../JoinZoomPrompt';
import { Summary } from '../sessions';

const StyledSessionPrereadingContainer = styled(Box)(() => ({
  height: '80%',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { display: 'none' },
  '&::-webkit-scrollbar-thumb': { display: 'none' }
}));

const SessionPrereading = ({
  cohort,
  sessions,
  activeSession
}: {
  cohort: Cohort;
  sessions: Session[];
  activeSession: Session | undefined;
}) => {
  const url = new URLSearchParams(useLocation().search);
  const url_source = url.get('source') || '';
  const [list, setList] = useState<SessionMaterial[]>([]);
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    const initMaterials = async () => {
      if (activeSession) {
        try {
          const response = await axios.get(
            `/cohort_sessions/${activeSession.id}/session_materials.json`
          );
          setList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    initMaterials();
  }, [activeSession]);

  const onMark = async (index: number, value: boolean) => {
    if (index >= 0 && index < list.length) {
      const updated = list;
      try {
        const response = await axios.post(
          `/cohort_sessions/${activeSession?.id}/session_materials/${updated[index].id}/submit_checklist.json`,
          {
            complete: value
          }
        );
        sendAnalyticsData(
          activeSession?.number,
          HOME_PAGE_EVENTS.to_do_list,
          `Marked Item as ${value ? 'true' : 'false'} from Home-Tab`
        );
        updated[index].complete = response.data;
        setList([...updated]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sessionDescription = (innerContent: string) => (
    <Box
      className="ql-editor"
      data-testid="session-description"
      dangerouslySetInnerHTML={{ __html: innerContent }}
      style={{
        fontWeight: 400,
        fontSize: '14px',
        height: 'auto',
        lineHeight: '28px',
        padding: '0px 5px 15px 0px',
        marginRight: '4px'
      }}
    />
  );
  const preReadingsCompleted = () => list.filter((item) => item.complete === false).length === 0;

  const isZoomLinkVisible = () => {
    if (activeSession) {
      const sessionTime = moment(firstUpcomingDate(activeSession.times));
      // Show zoom link preview before 1 hour and till 2 hours after session time
      return sessionTime < moment().add(1, 'hours') && moment().subtract(2, 'hours') < sessionTime;
    }
    return false;
  };

  return (
    <SectionContainer className="card-2" data-testid="to-do-card">
      {sessions && cohort ? (
        <>
          {activeSession ? (
            <>
              <Box
                data-testid="to-do-header"
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}
              >
                {preReadingsCompleted() ? (
                  <>
                    <Box>
                      <Typography color="text.primary" style={{ fontSize: '18px' }}>
                        🎉 You’re all ready to go for{activeSession.custom_name ? ' our ' : ' '}
                        <b>{activeSession.custom_name || `Session ${activeSession?.number}`}</b>
                      </Typography>
                      <p style={{ fontSize: '14px' }}>We look forward to seeing you soon</p>
                    </Box>
                    <Box>
                      {list.length > 0 && (
                        <CircularProgressbar
                          strokeWidth={14}
                          totalSteps={list.length}
                          completedSteps={list.filter((item) => item.complete === true).length}
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box>
                      <Typography color="text.primary" style={{ fontSize: '18px' }}>
                        Get Ready for{activeSession.custom_name ? ' our ' : ' '}
                        <b>{activeSession.custom_name || `Session ${activeSession?.number}`}</b>
                      </Typography>
                      <p style={{ fontSize: '14px' }}>
                        The following tasks are recommended but not required
                      </p>
                    </Box>
                    <Box>
                      <CircularProgressbar
                        strokeWidth={14}
                        totalSteps={list.length}
                        completedSteps={list.filter((item) => item.complete === true).length}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <StyledSessionPrereadingContainer>
                {isZoomLinkVisible() && (
                  <JoinZoomPrompt
                    displayType="small"
                    isFree={false}
                    sessionTimeValue={firstUpcomingDate(activeSession.times)}
                    sessionTimesPreview={zoomTimesPreview(activeSession.times)}
                    sessionZoomUrl={activeSession.zoom_url}
                    onClick={(sessionNumber: number) => {
                      sendAnalyticsData(
                        sessionNumber,
                        HOME_PAGE_EVENTS.joined_zoom_session,
                        HOME_PAGE_EVENTS.opened_zoom_link,
                        url_source
                      );
                      axios.post(`/cohorts/${cohort?.id}/cohort_session_attendance.json`, {
                        status: 'attended_live',
                        session_id: activeSession?.id
                      });
                    }}
                  />
                )}
                {activeSession.description && sessionDescription(activeSession.description)}
                {list.map((preReading, index) => (
                  <PreReadingRow
                    key={index}
                    number={index}
                    item={preReading}
                    onPreReadingClick={() =>
                      sendAnalyticsData(
                        activeSession.number,
                        HOME_PAGE_EVENTS.to_do_list,
                        'Opened Resource from Home-Tab'
                      )
                    }
                    checkboxHanlder={(value: boolean) => onMark(index, value)}
                  />
                ))}
              </StyledSessionPrereadingContainer>
            </>
          ) : (
            <Box
              style={{
                height: '80%',
                overflowY: 'scroll'
              }}
            >
              <Summary onTrack={() => {}} key="summary" innerContent={cohort.goodbye_message} />
            </Box>
          )}
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default SessionPrereading;
