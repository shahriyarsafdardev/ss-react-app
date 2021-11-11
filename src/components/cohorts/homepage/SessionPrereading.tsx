import { useEffect, useState } from 'react';
import moment from 'moment';
import Page from 'components/Page';

import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { getSessions } from '../../../redux/slices/cohort';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { SessionMaterial } from '../../../@types/cohorts';
import LoadingScreen from '../../LoadingScreen';

import axios from '../../../utils/axios';
import { SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import CircularProgressbar from './CircularProgressBar';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '60%',
  left: '38%'
}));

const SessionPrereading = () => {
  const [list, setList] = useState<SessionMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  useEffect(() => {
    const initMaterials = async () => {
      let activeSession = '';
      sessions?.forEach((session) => {
        if (moment(session.time) > moment()) {
          activeSession = session.id;
        }
      });
      if (activeSession) {
        try {
          const response = await axios.get(
            `/cohorts/${cohort_id}/cohort_sessions/${activeSession}/session_materials.json`
          );
          setList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };
    initMaterials();
  }, [sessions]);

  const onMark = (index: number, value: boolean) => {
    if (index >= 0 && index < list.length) {
      const updated = list;
      updated[index].complete = value;
      setList([...updated]);
    }
  };
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <SectionContainer className="card-2">
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Box>
          <p style={{ fontSize: '18px' }}>
            Get Ready for <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>Session 2</span>
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
    </SectionContainer>
  );
};

export default SessionPrereading;
