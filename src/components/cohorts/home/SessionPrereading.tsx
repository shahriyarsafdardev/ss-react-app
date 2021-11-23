import { useEffect, useState } from 'react';
import moment from 'moment';
import { styled } from '@material-ui/core/styles';
import { trackHomePageEvents, HOME_PAGE_EVENTS } from 'utils/amplitude';

import { Box } from '@material-ui/core';
import { getSessions } from '../../../redux/slices/cohort';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { Session, SessionMaterial } from '../../../@types/cohorts';
import axios from '../../../utils/axios';
import { CircularLoader, SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import CircularProgressbar from './CircularProgressBar';
import VideoPlaceHolder from '../VideoPlaceHolder';
import { Summary } from '../sessions';

const StyledSessionPrereadingContainer = styled(Box)(() => ({
  height: '400px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-thumb': { borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, .3)' }
}));

const SessionPrereading = () => {
  const [list, setList] = useState<SessionMaterial[]>([]);
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const [activeSession, setActiveSession] = useState<Session | undefined>();

  useEffect(() => {
    setActiveSession(undefined);
  }, []);

  useEffect(() => {
    setActiveSession(undefined);
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort, sessions]);

  useEffect(() => {
    if (!activeSession) {
      let found = false;
      sessions?.forEach((session) => {
        if (!found && moment(session.time).add(1, 'hour') > moment()) {
          setActiveSession(session);
          found = true;
        }
      });
    }
  }, [sessions, activeSession]);

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
        trackHomePageEvents(
          cohort.name,
          cohort.intake,
          activeSession?.number,
          HOME_PAGE_EVENTS.to_do_list,
          `Marked Item as ${value ? 'true' : 'false'}`
        );
        updated[index].complete = response.data;
        setList([...updated]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const preReadingsCompleted = () => {
    if (list?.length > 0) {
      return list.filter((item) => item.complete === false).length === 0;
    }
    return false;
  };

  return (
    <SectionContainer className="card-2">
      {sessions && cohort ? (
        <>
          {activeSession ? (
            <>
              <Box
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
                      <CircularProgressbar
                        strokeWidth={14}
                        totalSteps={list.length}
                        completedSteps={list.filter((item) => item.complete === true).length}
                      />
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
                        These tasks should be completed before the session starts
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
                {moment(activeSession.time).subtract(1, 'hours') < moment() && (
                  <VideoPlaceHolder
                    displayType="small"
                    sessionTimeValue={activeSession.time}
                    sessionZoomUrl={activeSession.zoom_url}
                  />
                )}
                {list.map((preReading, index) => (
                  <PreReadingRow
                    key={index}
                    item={preReading}
                    onPreReadingClick={() =>
                      trackHomePageEvents(
                        cohort.name,
                        cohort.intake,
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
              <Summary key="summary" innerContent={cohort.goodbye_message} />
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
