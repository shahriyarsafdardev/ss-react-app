import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { styled } from '@material-ui/core/styles';
import { HOME_PAGE_EVENTS } from 'utils/amplitude';
import { Box } from '@material-ui/core';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Session, SessionMaterial, Cohort } from '../../../@types/cohorts';
import axios from '../../../utils/axios';
import { CircularLoader, firstUpcomingDate, SectionContainer, zoomTimesPreview } from './Common';
import PreReadingRow from './PreReadingRow';
import CircularProgressbar from './CircularProgressBar';
import JoinZoomPrompt from '../JoinZoomPrompt';
import { Summary } from '../sessions';

const StyledSessionPrereadingContainer = styled(Box)(() => ({
  height: '400px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-thumb': { borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, .3)' }
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
                      <p style={{ fontSize: '18px' }}>
                        🎉 You’re all ready to go for{' '}
                        <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>
                          Session {activeSession?.number}
                        </span>
                      </p>
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
                      <p style={{ fontSize: '18px' }}>
                        Get Ready for{' '}
                        <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>
                          Session {activeSession?.number}
                        </span>
                      </p>
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
                {moment(firstUpcomingDate(activeSession.times)).subtract(1, 'hours') < moment() && (
                  <JoinZoomPrompt
                    displayType="small"
                    sessionTimeValue={firstUpcomingDate(activeSession.times)}
                    sessionTimesPreview={zoomTimesPreview(activeSession.times)}
                    sessionZoomUrl={activeSession.zoom_url}
                    onClick={(sessionNumber: number) => {
                      sendAnalyticsData(
                        sessionNumber,
                        HOME_PAGE_EVENTS.zoom_preview,
                        HOME_PAGE_EVENTS.opened_zoom_link
                      );
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
            <Box style={{ height: '400px', overflow: 'scroll' }}>
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
