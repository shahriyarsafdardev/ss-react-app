import { useEffect, useState } from 'react';
import moment from 'moment';

import { Box } from '@material-ui/core';
import { getSessions } from '../../../redux/slices/cohort';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { Session, SessionMaterial } from '../../../@types/cohorts';
import axios from '../../../utils/axios';
import { CircularLoader, SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import CircularProgressbar from './CircularProgressBar';

const SessionPrereading = () => {
  const [list, setList] = useState<SessionMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const [activeSession, setActiveSession] = useState<Session>();

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  useEffect(() => {
    let found = false;
    sessions?.forEach((session) => {
      if (!found && moment(session.time).add(1, 'hour') > moment()) {
        setActiveSession(session);
        found = true;
      }
    });
  }, [sessions]);

  useEffect(() => {
    const initMaterials = async () => {
      setLoading(true);
      if (activeSession) {
        try {
          const response = await axios.get(
            `/cohort_sessions/${activeSession.id}/session_materials.json`
          );
          setList(response.data);
          setLoading(false);
          setActiveSession(activeSession);
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
        updated[index].complete = response.data;
        setList([...updated]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SectionContainer className="card-2">
      {!loading ? (
        <>
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
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
          </Box>
          <Box style={{ height: '400px', overflow: 'scroll' }}>
            {list.map((preReading, index) => (
              <PreReadingRow
                key={index}
                item={preReading}
                checkboxHanlder={(value: boolean) => onMark(index, value)}
              />
            ))}
          </Box>
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default SessionPrereading;
